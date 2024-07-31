import { FastifySchema } from "fastify";
import { Static, Type } from "@sinclair/typebox";

// common schema
export const JudgeSchema = Type.Object({
	id: Type.Number(),
	tournament_id: Type.Number(),
	code: Type.String(),
	name: Type.String(),
});

export type Judge = Static<typeof JudgeSchema>;

// Params
const CreateJudgeParams = Type.Object({
	tournament_id: Type.Number(),
});
const GetJudgeParams = Type.Object({
	tournament_id: Type.Number(),
	judge_id: Type.Number(),
});

// Security
const BearerSecurity = [
	{
		bearerAuth: [],
	},
];

// Body
const CreateJudgeBody = Type.Omit(JudgeSchema, ["id", "tournament_id", "code"]);

export type CreateJudge = Static<typeof CreateJudgeBody>;

// Response
const NotFoundResponse = Type.Object({
	msg: Type.String({ default: "Judge not found" }),
});

const BaseResponse = {
	200: JudgeSchema,
	404: NotFoundResponse,
};

// Routes
const tags = ["judge"];

export const CreateJudgeSchema: FastifySchema = {
	tags,
	params: CreateJudgeParams,
	body: CreateJudgeBody,
	response: {
		201: JudgeSchema,
	},
	security: BearerSecurity,
};

export const GetManyJudgeSchema: FastifySchema = {
	tags,
	params: CreateJudgeParams,
	response: {
		200: Type.Array(JudgeSchema),
	},
};

export const GetOneJudgeSchema: FastifySchema = {
	tags,
	params: GetJudgeParams,
	response: BaseResponse,
};

export const UpdateJudgeSchema: FastifySchema = {
	tags,
	params: GetJudgeParams,
	body: CreateJudgeBody,
	response: BaseResponse,
	security: BearerSecurity,
};

export const DeleteJudgeSchema: FastifySchema = {
	tags,
	params: GetJudgeParams,
	response: BaseResponse,
	security: BearerSecurity,
};
