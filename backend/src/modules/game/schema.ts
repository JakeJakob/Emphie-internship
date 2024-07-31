import { FastifySchema } from "fastify";
import { Static, Type } from "@sinclair/typebox";

// common schema
export const GameSchema = Type.Object({
	id: Type.Number(),
	tournament_id: Type.Number(),
	white_id: Type.Number(),
	black_id: Type.Number(),
	round: Type.Number(),
	winner_id: Type.Union([Type.Number(), Type.Null()]),
});

export type Game = Static<typeof GameSchema>;

// Params
const CreateGameParams = Type.Object({
	tournament_id: Type.Number(),
});
const GetGameParams = Type.Object({
	tournament_id: Type.Number(),
	game_id: Type.Number(),
});

// Security
const BearerSecurity = [
	{
		bearerAuth: [],
	},
];

// Body
const CreateGameBody = Type.Union([
	Type.Omit(GameSchema, ["id", "tournament_id", "winner_id"]),
	Type.Object({ winner_id: Type.Optional(Type.Number()) }),
]);

export type CreateGame = Static<typeof CreateGameBody>;

// Response
const NotFoundResponse = Type.Object({
	msg: Type.String({ default: "Game not found" }),
});

const BaseResponse = {
	200: GameSchema,
	404: NotFoundResponse,
};

// Routes
const tags = ["game"];

export const CreateGameSchema: FastifySchema = {
	tags,
	params: CreateGameParams,
	body: CreateGameBody,
	response: {
		201: GameSchema,
	},
	security: BearerSecurity,
};

export const GetManyGameSchema: FastifySchema = {
	tags,
	params: CreateGameParams,
	response: {
		200: Type.Array(GameSchema),
	},
};

export const GetOneGameSchema: FastifySchema = {
	tags,
	params: GetGameParams,
	response: BaseResponse,
};

export const UpdateGameSchema: FastifySchema = {
	tags,
	params: GetGameParams,
	body: CreateGameBody,
	response: BaseResponse,
	security: BearerSecurity,
};

export const DeleteGameSchema: FastifySchema = {
	tags,
	params: GetGameParams,
	response: BaseResponse,
	security: BearerSecurity,
};
