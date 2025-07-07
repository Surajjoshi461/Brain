import { Request, RequestHandler } from "express";
import { APIResponse, EmptyObject } from "../apiResponse/apiResponse";

export type PathParams<T = EmptyObject> = EmptyObject & T;
export type ResponseBody<T = EmptyObject> = APIResponse<T | EmptyObject>;
export type RequestBody<T = EmptyObject> = EmptyObject & T;
export type QueryParams<T = EmptyObject> = EmptyObject & T;

export type CustomRequestHandler<
  Path = EmptyObject,
  ResBody = EmptyObject,
  ReqBody = EmptyObject,
  Query = EmptyObject
> = RequestHandler<Path, APIResponse<ResBody>, ReqBody, Query>;

export default interface CustomRequest<
  Path = EmptyObject | { botId?: string },
  ResBody = EmptyObject,
  ReqBody = EmptyObject,
  Query = EmptyObject
> extends Request<Path, APIResponse<ResBody>, ReqBody, Query> {}
