// import {Entity, PrimaryGeneratedColumn, Column, BaseEntity,ManyToOne,JoinColumn} from "typeorm";
// import { Users } from './User';

// @Entity("contacts")
// export class Contacts extends BaseEntity{

//     @PrimaryGeneratedColumn()
//     id: number;

//     @Column("text")
//     name: string;

//     @Column("text")
//     village: string;

//     @Column("text")
//     district: string;

//     @Column("text")
//     crop: string;

//     @Column("text")
//     contact_no: number;

//     @Column("text")
//     rca_id: number;



//     // @ManyToOne(()=>Users,user=>user.contacts)
//     // @JoinColumn({name:"rca_id"})
//     // user:Users

//     @ManyToOne(() => Users)
//     @JoinColumn({name: 'rca_id', referencedColumnName: 'id'})
//     user: Users;


// }
import { Column, Entity, PrimaryGeneratedColumn, BaseEntity, ManyToOne, JoinColumn } from 'typeorm';
import Users from '../entity/User';
//import visitlog from './visitlog';

@Entity()
export class Contacts extends BaseEntity {
    
  @PrimaryGeneratedColumn()
  id: number;

  @Column("text")
  name: string;

  @Column("text")
  village: string;

  @Column("text")
  district: string;

  @Column("text")
  crop: string;

  @Column()
  next_date:Date;

  @Column()
  field_size:number;

  @Column()
  date:Date;

  @Column("text")
  contact_no: number;

  @Column("text")
  rca_id: number;

  @Column("text")
  reason: string;

  @Column("text")
  status: string;

  @Column("text")
  remarks: string;

  @ManyToOne(() => Users, user => user.contact)
  @JoinColumn({ name: "rca_id" })
  user: Users;

//  @OneToMany(()=>visitlog,log=>log.contacts)
//  @JoinColumn({name:"contactid"})
//  log:visitlog;

  // @ManyToOne(() => visitlog, uuser => uuser.contact)
  // @JoinColumn({ name: "rca_id" })
  // uuser: visitlog;
 
}

export default Contacts;
