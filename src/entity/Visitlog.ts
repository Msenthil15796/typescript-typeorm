import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, UpdateDateColumn, JoinColumn, ManyToOne} from "typeorm";
import Users from "./User";

@Entity()
export class Visit_log extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @UpdateDateColumn()
    visited_date: Date;

    @Column()
    user_id: number;

    @Column()
    contactid: number;

    @Column("text")
    status: string;

    @Column("text")
    remarks: string;

    @Column("text")
    reason: string;

     @ManyToOne(() => Users, user => user.log)
     @JoinColumn({ name: "user_id" })
     user: Users;


    //  @ManyToOne(() => Contacts, contacts => contacts.log)
    //  @JoinColumn({ name: "contactid" })
    // //  contacts: Contacts;
    // @OneToMany(() => Contacts, contact => contact.user)
    // contact: Contacts[];
    


}

export default Visit_log;