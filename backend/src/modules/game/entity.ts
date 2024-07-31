import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	ManyToOne,
	JoinColumn,
} from "typeorm";
import { Tournament } from "../tournament/entity";
import { Player } from "../player/entity";

@Entity({ name: "games" })
export class Game {
	@PrimaryGeneratedColumn()
	id?: number;

	@ManyToOne(() => Tournament, { cascade: true })
	@JoinColumn({ name: "tournament_id" })
	tournament!: Tournament;

	@Column()
	tournament_id!: number;

	@ManyToOne(() => Player, { cascade: true })
	@JoinColumn({ name: "white_id" })
	white!: Player;

	@Column()
	white_id!: number;

	@ManyToOne(() => Player, { cascade: true })
	@JoinColumn({ name: "black_id" })
	black!: Player;

	@Column()
	black_id!: number;

	@Column()
	round!: number;

	@ManyToOne(() => Player, { cascade: true, nullable: true })
	@JoinColumn({ name: "winner_id" })
	winner?: Player;

	@Column({ nullable: true })
	winner_id?: number;
}
