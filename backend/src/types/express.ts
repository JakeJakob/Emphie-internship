import { Request, Response } from "express";
import { Send } from "express-serve-static-core";

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export interface TypedRequest<ResBody> extends Request {
	body: ResBody;
}

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export interface TypedResponse<ResBody, ResLocals extends Record<never, never> = Record<never, never>> extends Response {
	locals: ResLocals;
	json: Send<ResBody, this>;
}
