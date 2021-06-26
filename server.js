const http = require('http');
const chokidar = require('chokidar');
const shortid = require('shortid');
const path = require('path');

module.exports = function createServer({ paths, ignored }) {
  const clients = [];

  const server = http.createServer((req, res) => {
    if (req.url !== '/refresh') {
      return;
    }

    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      Connection: 'keep-alive',
      'Cache-Control': 'no-cache',
      'Access-Control-Allow-Origin': '*',
    });

    // next.js heartbeat
    // https://github.com/vercel/next.js/blob/9baee888afa1519796510cd1ebca07ee54d17e87/packages/next/client/dev/dev-build-watcher.js#L45
    res.write('data: 💓\n\n');

    const clientId = shortid();
    clients.push({
      id: clientId,
      response: res,
    });

    req.on('close', () => {
      clients.splice(
        clients.findIndex((client) => client.id === clientId),
        1,
      );
    });
  });

  chokidar
    .watch(
      (Array.isArray(paths) ? paths : [paths]).map((filePath) =>
        path.resolve(process.cwd(), filePath),
      ),
      { ignored }
    )
    .on('change', (filePath) => {
      const baseName = path.basename(path.dirname(process.cwd()));
      const updatedPath = `${baseName}${filePath.split(baseName)[1]}`;
      console.log(`[remote-refresh] ${path.basename(filePath)} updated`);
      const event = {
        // use action: 'building' to trick next.js to render loading indicator
        // https://github.com/vercel/next.js/blob/9baee888afa1519796510cd1ebca07ee54d17e87/packages/next/client/dev/dev-build-watcher.js#L59-L65
        action: 'building',
        // we actually only need this part
        path: updatedPath,
      };
      clients.forEach((client) => {
        client.response.write(`data: ${JSON.stringify(event)}\n\n`);
      });
    });

  server.listen(0, () =>
    console.log(`[remote-refresh] server is listening at port ${server.address().port}`),
  );
  return server.address().port;
};