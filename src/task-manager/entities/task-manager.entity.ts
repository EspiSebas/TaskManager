import { Column, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import  { Status } from "../../common/states.enum"
import { Project } from "src/project/entities/project.entity";
import { User } from "src/users/entities/user.entity";

@Entity()
export class TaskManager {
    
    @Column({ primary:true , generated:true})
    id: number;

    @Column()
    name: string;

    @Column()
    description: String;

    @Column({
        type:"enum",
        enum: Status,
        default:Status.PENDING
    })
    
    state: Status;


    @Column({ nullable: true })
    comment: String;

    @ManyToOne( () => Project, (project) => project.taskManager, { nullable:true } )
    project : Project;

    
    @ManyToOne( ()=> User)
    @JoinColumn({ name: 'userId' })
    dev: User;
    
    @DeleteDateColumn({ nullable: true })
    deletedAt?: Date;
}
