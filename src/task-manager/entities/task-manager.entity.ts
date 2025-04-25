import { Column, Entity, ManyToOne, OneToOne } from "typeorm";
import  { TaskState } from "./states.enum"
import { Project } from "src/project/entities/project.entity";

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
        enum: TaskState,
        default:TaskState.PENDING
    })
    
    state: TaskState;


    @Column({ nullable: true })
    comment: String;

    @ManyToOne( () => Project, (project) => project.taskManager, { nullable:true } )
    project : Project;
    
}
