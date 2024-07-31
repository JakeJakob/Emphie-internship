import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	ManyToOne,
	JoinColumn,
} from "typeorm";
import { Tournament } from "../tournament/entity";

@Entity({ name: "judges" })
export class Judge {
	@PrimaryGeneratedColumn()
	id?: number;

	@ManyToOne(() => Tournament, { cascade: true })
	@JoinColumn({ name: "tournament_id" })
	tournament!: Tournament;

	@Column()
	tournament_id!: number;

	@Column()
	code!: string;

	@Column()
	name!: string;
}
