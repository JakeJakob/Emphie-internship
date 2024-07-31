import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity({ name: "admins" })
export class Admin {
	@PrimaryColumn()
	id?: number;

	@Column()
	api_key!: string;
}
