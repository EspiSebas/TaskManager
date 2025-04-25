import { TaskManager } from "src/task-manager/entities/task-manager.entity";
import { Column, Entity, OneToMany } from "typeorm";

@Entity()
export class Project {

    @Column({ primary: true, generated: true })
    id: number;

    @Column()
    name: string;

    @OneToMany(() => TaskManager , (taskManager) => taskManager.project , {
        eager:true
    }) 

    taskManager:TaskManager[];
}
