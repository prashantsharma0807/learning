import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserRole } from "./users.enums";
import * as bcrypt from 'bcrypt';

@Entity('users')
export class Users {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    first_name: string;

    @Column({ nullable: true })
    last_name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({nullable:true})
    image: string;

    @Column({
        type: 'enum',
        enum: Object.values(UserRole),
        default: UserRole['Student']
    })
    role: string;

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;

    @DeleteDateColumn({
        nullable: true,
    })
    deleted_at?: Date;


    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword(){
        if(this.password){
            console.log(this.password)
            this.password = await bcrypt.hash(this.password, 10)
            console.log(this.password)
        }
    }

}
