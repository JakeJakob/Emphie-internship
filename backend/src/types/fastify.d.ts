import { Repository } from "typeorm";
import { Tournament } from "../modules/tournament/entity";
import { Player } from "../modules/player/entity";
import { MockedRepository } from "../plugins/db.mock";
import { Server } from "socket.io";
import { TokenType } from "../plugins/auth";

declare module "fastify" {
	interface FastifyRequest {
		token: string | undefined;
		token_type: TokenType | undefined;
	}

	interface FastifyInstance {
		checkToken: (req: any, res: any, done: () => void) => void;
		onlyAdmin: (req: any, res: any, done: () => void) => void;
		judgeOrAdmin: (req: any, res: any, done: () => void) => void;
		config: {
			PORT: number;
			HOST: string;
			DB_TYPE: "sqlite" | "postgres";
			DB_URL: string | undefined;
			DB_DATABASE: string | undefined;
			DB_LOGGING: boolean;
			DB_SYNCHRONIZE: boolean;
			NODE_ENV: string;
			DEFAULT_ADMIN: boolean;
			DEFAULT_ADMIN_KEY: string;
		};
		db: {
			admin: Repository<Admin>;
			judge: Repository<Judge>;
			tournament: Repository<Tournament>;
			player: Repository<Player>;
			game: Repository<Game>;
		};
		socket: Server;
	}
}
