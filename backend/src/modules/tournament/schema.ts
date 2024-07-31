import { FastifySchema } from "fastify";
import { Type, type Static } from "@sinclair/typebox";

// Common schemas
export const TournamentSchema = Type.Object({
	id: Type.Number(),
	name: Type.String(),
	code: Type.String(),
});

export type Tournament = Static<typeof TournamentSchema>;

// Params
const GetTournamentParams = Type.Object({
	tournament_id: Type.Number(),
});

const GetTournamentByCodeParams = Type.Object({
	tournament_code: Type.String(),
});

// Security
const BearerSecurity = [
	{
		bearerAuth: [],
	},
];

// Body
export const CreateTournamentBody = Type.Omit(TournamentSchema, ["id", "code"]);

export type CreateTournament = Static<typeof CreateTournamentBody>;

// Response
const NotFoundResponse = Type.Object({
	msg: Type.String({ default: "Tournament not found" }),
});

const BaseResponse = {
	200: TournamentSchema,
	404: NotFoundResponse,
};

// Routes
const tags = ["tournament"];

export const CreateTournamentSchema: FastifySchema = {
	tags,
	body: CreateTournamentBody,
	response: {
		201: TournamentSchema,
	},
	security: BearerSecurity,
};

export const GetOneTournamentSchema: FastifySchema = {
	tags,
	params: GetTournamentParams,
	response: BaseResponse,
};

export const GetOneTournamentByCodeSchema: FastifySchema = {
	tags,
	params: GetTournamentByCodeParams,
	response: BaseResponse,
};

export const UpdateTournamentSchema: FastifySchema = {
	tags,
	params: GetTournamentParams,
	body: CreateTournamentBody,
	response: BaseResponse,
	security: BearerSecurity,
};

export const DeleteTournamentSchema: FastifySchema = {
	tags,
	params: GetTournamentParams,
	response: BaseResponse,
	security: BearerSecurity,
};
