import {gql} from "apollo-server-express";
// import * as sqlite3 from 'sqlite3';
// import { promisify } from 'bluebird';

// const db = new sqlite3.Database('db.sqlite3');

// db.get = promisify(db.get);
// db.all = promisify(db.all);
//const date = new Date('2017-11-25T23:45:35.116Z').toISOString();


export const typeDefs=gql`

type User{
    id:ID!,
    username:String!,
    phone:String!,
    password:String!,
    role_id:Int!
    contact:[Contact],
    
}, 
# type success{
#     user:[User],
#     message:String!,
#     token:String!
# }
type Contact{
    id:ID!,
    name:String,
    village:String,
    district:String,
    crop:String,
    next_date:String,
    field_size:Int,
    date:String,
    contact_no:String,
    rca_id:Int
    status:String,
    remarks:String,
    reason:String
},
type Visit_log{
    id:ID!,
    visited_date:String,
    user_id:Int,
    contactid:Int,
    status:String,
    remarks:String,
    reason:String
},
type Query{
    user(id: ID!): User
    visitlog(id:ID!):[Visit_log!]!
    searchContacts(name:String!):[Contact!]!
    searchLog(name:String!):[Visit_log!]!
    myprofile(id: ID!): User
 },

 input syncDataInput{
     name:String!,
     village:String!,
     district:String!,
     crop:String!,
     contact_no:String!,
     rca_id:Int!
 }
type Mutation{
    register(first_name:String!,last_name:String!,Phone:String!,username:String!,password:String!):Boolean!
    login(username:String!,password:String!):String!
    invalidateTokens:Boolean!                                                                           
    addContact(name:String!,village:String!,district:String!,crop:String!,contact_no:String!,rca_id:Int!):String!
    addLog(visited_date:String!,user_id:Int!,contactid:Int!,status:String!,remarks:String!,reason:String!):String!
    syncData(data:[syncDataInput]):String!
}
`;