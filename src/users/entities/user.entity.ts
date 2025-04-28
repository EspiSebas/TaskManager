import { Collection, Column, DeleteDateColumn, Entity } from "typeorm";

@Entity()
export class User {

    @Column({ primary:true, generated:true})
    id: number;

    @Column()
    name: string;

    @Column({ unique:true,nullable:false })
    email: string;

    @Column({nullable:false , select: false})
    password: string;

    @Column({ default: "developer"})
    role: string;

    @DeleteDateColumn()
    deletedAt: Date;

}
