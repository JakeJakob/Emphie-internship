import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	ManyToOne,
	JoinColumn,
} from "typeorm";
import { Tournament } from "../tournament/entity";

@Entity({ name: "players" })
export class Player {
	@PrimaryGeneratedColumn()
	id?: number;

	@ManyToOne(() => Tournament, { cascade: true })
	@JoinColumn({ name: "tournament_id" })
	tournament!: Tournament;

	@Column()
	tournament_id!: number;

	@Column()
	first_name!: string;

	@Column()
	last_name!: string;

	@Column()
	rank!: number;

	@Column({ nullable: true })
	title?: string;
}
