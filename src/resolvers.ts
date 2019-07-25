
import * as bcrypt from 'bcryptjs';
import { IResolvers } from 'graphql-tools';
import { createTokens } from './auth';
import { Contacts } from './entity/Contact';
import { Users } from "./entity/User";
import { Visit_log } from './entity/Visitlog';
import { ForbiddenError } from 'apollo-server-errors';



//import { find, filter } from "lodash";


export const resolvers: IResolvers = {


    Query: {
        user: async (_, args) => {
            // (_, args, context)
            const user = await Users.findOne({ where: { id: args.id } });
            const contact = await Contacts.find({ where: { rca_id: args.id } });
            // const vislog = await visit_log.find({ where: { user_id: args.id } });
            // const uuser =await visit_log.find({where:{contactid:args.id}})
            // //console.log(user);
            return { contact, user };
        },

        visitlog: async (_, args) => {
            //console.log(args);

            //const user1 = await Users.findOne({ where: { id: args.id } });
            const vislog = await Visit_log.find({ where: { user_id: args.id } });
            //const contact = await Contacts.find({ where: { contactid: args.id } });
            //console.log(vislog);
            return vislog;
        },
        searchContacts: async (_, args) => {
            //const user = await Contacts.find({ where: { rca_id: args.id } });
            const search = await Contacts.find({ where: { name: args.name } });


            return search;
        },

        searchLog: async (_, args) => {

            const search1 = await Visit_log.find({ where: { name: args.name } });
            return search1;

        },
        myprofile: async (_, args) => {
            const user = await Users.findOne({ where: { id: args.id } });
            return user;
        }
    },


    Mutation: {
        register: async (_, { first_name, last_name, phone, username, password }) => {
            const hashedPassword = await bcrypt.hash(password, 10);
            await Users.create({
                first_name,
                last_name,
                phone,
                username,
                password: hashedPassword


            }).save();

            return true;
        },
        login: async (_, { username, password }) => {
            const user = await Users.findOne({ where: { username } });
            if (!user) {
                throw new ForbiddenError('user  does not exist');
            }


            const valid = await bcrypt.compare(password, user.password);
            if (!valid) {
                throw new Error('password incorrect');
            }

            
            const accessToken = createTokens(user);
            // if(accessToken){
            //     return {accessToken}
            // }
            
            return accessToken;

           
            //     "Authorization": "Bearer <JWT>"
            //   }  //add  this commented line for JWT token authorization header

        },
        invalidateTokens: async (_, __, { req }) => {
            if (!req.userId) {
                return false;
            }

            const user = await Users.findOne(req.userId);
            if (!user) {
                return false;
            }
            user.remember_token += 1;
            await user.save();

            return true;

        },

        addContact: async (_, { name, village, district, crop, contact_no, rca_id,field_size,date,status,reason,remarks,next_date }, { req }) => {
            const token = req.headers.authorization;

            if (!token) {

                return "Access Denied";
            }
            else {

                Contacts.create({
                    name,
                    village,
                    district,
                    crop,
                    contact_no,
                    rca_id,
                    field_size, 
                    date, 
                    status,
                    reason,
                    remarks, 
                    next_date
                    


                }).save();

                //return contact;
                return "Contact Added Successfully";

            }
        },
        addLog: async (_, { visited_date, user_id, contactid, status, remarks, reason }, { req }) => {
            const token = req.headers.authorization;

            if (!token) {

                return "Access Denied & Please Login";
            }
            else {

                await Visit_log.create({
                    visited_date,
                    user_id,
                    contactid,
                    status,
                    remarks,
                    reason


                }).save();

                return "visitlog updated successfully";
            }



        },
        syncData: async (_, {data:[syncDataInput]}, { req }) => {
            const token = req.headers.authorization;

            if (!token) {

                return "Access Denied";
            }
            else {

                Contacts.save([syncDataInput]);


                //return contact;
                return "Contact Table Synchronised !! *_* ";

            }
        }

    }
}; 