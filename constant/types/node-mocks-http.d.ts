declare module "node-mocks-http" {
  import { IncomingHttpHeaders, IncomingMessage, ServerResponse } from "http"

  type RequestMethod =
    | "GET"
    | "POST"
    | "PUT"
    | "DELETE"
    | "PATCH"
    | "OPTIONS"
    | "HEAD"

  interface MockRequestOptions {
    method?: RequestMethod
    url?: string
    query?: Record<string, any>
    body?: any
    headers?: IncomingHttpHeaders
  }

  interface MockResponseOptions {
    eventEmitter?: any
  }

  interface MockRequest extends IncomingMessage {
    method: RequestMethod
    url: string
    query: Record<string, any>
    body: any
    headers: IncomingHttpHeaders
  }

  interface MockResponse extends ServerResponse {
    _getData: () => any
    _getJSONData: () => any
    _getStatusCode: () => number
  }

  export function createMocks(
    reqOptions?: MockRequestOptions,
    resOptions?: MockResponseOptions
  ): { req: MockRequest; res: MockResponse }

  export function createRequest(options?: MockRequestOptions): MockRequest

  export function createResponse(options?: MockResponseOptions): MockResponse
}

declare module "node-mocks-http" {
  import { IncomingHttpHeaders, IncomingMessage, ServerResponse } from "http"
  import { NextApiRequest, NextApiResponse } from "next"

  type RequestMethod =
    | "GET"
    | "POST"
    | "PUT"
    | "DELETE"
    | "PATCH"
    | "OPTIONS"
    | "HEAD"

  interface MockRequestOptions {
    method?: RequestMethod
    url?: string
    query?: Record<string, any>
    body?: any
    headers?: IncomingHttpHeaders
  }

  interface MockResponseOptions {
    eventEmitter?: any
  }

  interface MockRequest extends IncomingMessage, NextApiRequest {
    method: RequestMethod
    url: string
    query: Record<string, any>
    body: any
    headers: IncomingHttpHeaders
  }

  interface MockResponse extends ServerResponse, NextApiResponse {
    _getData: () => any
    _getJSONData: () => any
    _getStatusCode: () => number
  }

  export function createMocks(
    reqOptions?: MockRequestOptions,
    resOptions?: MockResponseOptions
  ): { req: MockRequest; res: MockResponse }

  export function createRequest(options?: MockRequestOptions): MockRequest

  export function createResponse(options?: MockResponseOptions): MockResponse
}
