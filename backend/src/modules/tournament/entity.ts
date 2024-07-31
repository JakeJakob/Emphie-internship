import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "tournaments" })
export class Tournament {
	@PrimaryGeneratedColumn()
	id?: number;

	@Column()
	name!: string;

	@Column({ unique: true })
	code!: string;
}
