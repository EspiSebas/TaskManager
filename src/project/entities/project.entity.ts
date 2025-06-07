import { Status } from "src/common/states.enum";
import { TaskManager } from "src/task-manager/entities/task-manager.entity";
import { Column, DeleteDateColumn, Entity, OneToMany } from "typeorm";

@Entity()
export class Project {

    @Column({ primary: true, generated: true })
    id: number;

    @Column()
    name: string;

    @OneToMany(() => TaskManager , (taskManager) => taskManager.project , {
        eager:false 
    }) 

    taskManager:TaskManager[];

    @Column({
        type:"enum",
        enum: Status,
        default:Status.PENDING
    })
    
    status: Status;


    @DeleteDateColumn({ nullable: true })
    deletedAt?: Date;
}

