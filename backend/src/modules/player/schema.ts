import { FastifySchema } from "fastify";
import { Static, Type } from "@sinclair/typebox";

// common schema
export enum ChessTitle {
	GM = "GM",
	IM = "IM",
	FM = "FM",
	CM = "CM",
	WGM = "WGM",
	WIM = "WIM",
	WFM = "WFM",
	WCM = "WCM",
}

export const PlayerSchema = Type.Object({
	id: Type.Number(),
	tournament_id: Type.Number(),
	first_name: Type.String(),
	last_name: Type.String(),
	rank: Type.Number(),
	title: Type.Union([Type.Enum(ChessTitle), Type.Null()]),
});

export type Player = Static<typeof PlayerSchema>;

// Params
const CreatePlayerParams = Type.Object({
	tournament_id: Type.Number(),
});
const GetPlayerParams = Type.Object({
	tournament_id: Type.Number(),
	player_id: Type.Number(),
});

// Security
const BearerSecurity = [
	{
		bearerAuth: [],
	},
];

// Body
const CreatePlayerBody = Type.Union([
	Type.Omit(PlayerSchema, ["id", "tournament_id", "title"]),
	Type.Object({ title: Type.Optional(Type.Enum(ChessTitle)) }),
]);

export type CreatePlayer = Static<typeof CreatePlayerBody>;

// Response
const NotFoundResponse = Type.Object({
	msg: Type.String({ default: "Player not found" }),
});

const BaseResponse = {
	200: PlayerSchema,
	404: NotFoundResponse,
};

// Routes
const tags = ["player"];

export const CreatePlayerSchema: FastifySchema = {
	tags,
	params: CreatePlayerParams,
	body: CreatePlayerBody,
	response: {
		201: PlayerSchema,
	},
	security: BearerSecurity,
};

export const GetManyPlayerSchema: FastifySchema = {
	tags,
	params: CreatePlayerParams,
	response: {
		200: Type.Array(PlayerSchema),
	},
};

export const GetOnePlayerSchema: FastifySchema = {
	tags,
	params: GetPlayerParams,
	response: BaseResponse,
};

export const UpdatePlayerSchema: FastifySchema = {
	tags,
	params: GetPlayerParams,
	body: CreatePlayerBody,
	response: BaseResponse,
	security: BearerSecurity,
};

export const DeletePlayerSchema: FastifySchema = {
	tags,
	params: GetPlayerParams,
	response: BaseResponse,
	security: BearerSecurity,
};
