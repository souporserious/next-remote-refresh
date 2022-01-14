/* eslint-env jest */
const { RouterContext } = require('next/dist/shared/lib/router-context')
const { createElement } = require('react')

const mockRouter = {
  basePath: '',
  pathname: '/',
  route: '/',
  asPath: '/',
  query: {},
  push: jest.fn(),
  replace: jest.fn(),
  reload: jest.fn(),
  back: jest.fn(),
  prefetch: jest.fn(),
  beforePopState: jest.fn(),
  events: {
    on: jest.fn(),
    off: jest.fn(),
    emit: jest.fn(),
  },
  isFallback: false,
}

const routerWrapper = ({ children }) => createElement(RouterContext.Provider, { value: mockRouter }, children)

module.exports = { mockRouter, routerWrapper }
