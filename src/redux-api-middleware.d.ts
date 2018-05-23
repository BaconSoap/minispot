declare module 'redux-api-middleware' {
  import { Middleware } from "redux";

  export const RSAA: string;
  export const apiMiddleware: Middleware;

  export type HTTPVerb = 'GET' | 'HEAD' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'OPTIONS';

  export interface RSAAction<R = 'REQUEST', S = 'SUCCESS', F = 'FAILURE'> {
    [propName: string]: { // Symbol as object key seems impossible
      endpoint: string;  // or function
      method: HTTPVerb;
      body?: any;
      headers?: { [propName: string]: string } | Function; // or function
      credentials?: 'omit' | 'same-origin' | 'include';
      bailout?: boolean; // or function
      types: [R, S, F];
    }
  }
}
