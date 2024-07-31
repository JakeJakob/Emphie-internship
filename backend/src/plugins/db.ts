import "reflect-metadata";
import fp from "fastify-plugin";
import { DataSource } from "typeorm";
import { Tournament } from "../modules/tournament/entity";
import { FastifyInstance } from "fastify";
import { Player } from "../modules/player/entity";
import { Admin } from "../modules/admin/entity";
import { Judge } from "../modules/judge/entity";
import { Game } from "../modules/game/entity";

export const dbPlugin = fp(async (server: FastifyInstance) => {
	let AppDataSource: DataSource;

	if (server.config.NODE_ENV === "test") {
		AppDataSource = new DataSource({
			type: "sqlite",
			database: ":memory:",
			entities: [Tournament, Player, Admin, Judge, Game],
			logging: false,
			synchronize: true,
		});
	} else if (server.config.DB_TYPE === "postgres") {
		AppDataSource = new DataSource({
			type: "postgres",
			url: server.config.DB_URL,
			entities: [Tournament, Player, Admin, Judge, Game],
			logging: server.config.DB_LOGGING,
			synchronize: server.config.DB_SYNCHRONIZE,
		});
	} else {
		AppDataSource = new DataSource({
			type: "sqlite",
			database: server.config.DB_DATABASE || ":memory:",
			entities: [Tournament, Player, Admin, Judge, Game],
			logging: server.config.DB_LOGGING,
			synchronize: server.config.DB_SYNCHRONIZE,
		});
	}

	await AppDataSource.initialize()
		.then(() => {
			server.log.info("Data Source has been initialized!");
		})
		.catch((err) => {
			server.log.error("Error during Data Source initialization", err);
		});

	server.decorate("db", {
		admin: AppDataSource.getRepository(Admin),
		judge: AppDataSource.getRepository(Judge),
		tournament: AppDataSource.getRepository(Tournament),
		player: AppDataSource.getRepository(Player),
		game: AppDataSource.getRepository(Game),
	});
});
