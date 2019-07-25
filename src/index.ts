import "reflect-metadata";
import {createConnection } from "typeorm";
import * as express from "express";
import * as cookieParser from "cookie-parser";
import {ApolloServer} from "apollo-server-express";

import {typeDefs} from "./typeDefs";
import {resolvers}from "./resolvers";
import { verify } from "jsonwebtoken";

import { ACCESS_TOKEN_SECRET } from "./constants";



//import { Users } from './entity/User';
//import { createTokens } from './auth';
//import { Contacts } from '../typesc/src/entity/Contact';


const startServer = async ()=>{  

 const server =new ApolloServer({
     typeDefs,
     resolvers,
     context:({req,res}:any)=>({req,res})
 });

  await createConnection();
  
  
  const app =express();

  app.use(cookieParser());
  

  app.use(async(req:any,_,next)=>{
    
    const token = req.headers.authorization;
  if (!token) {
    return next();
   
  }

  
   
   
   
   
    
    

    try{
    const data= verify(
      token.replace('Bearer ', ''),
      ACCESS_TOKEN_SECRET
    );
   
    console.log("test");
    console.log(data);
    return next();
    }catch {}
    
   

    //let data;

    // try {
    //    data= verify(refreshToken, REFRESH_TOKEN_SECRET) as any
    //   // req.userId = data.userId;
    //   // return next();
    // } catch {
    //     return next(); 
    // }
    // const user =await Users.findOne(data.userId)
    // if(!user || user.remember_token !==data.remember_token){
    //   return next();
    // }

    //  const tokens=createTokens(user);
    
    //  res.cookie("refresh-token",tokens.refreshToken);
    //  res.cookie("access-token",tokens.accessToken);
    // req.userId=user.id;
 

    next();
  });
  
 server.applyMiddleware({app});

 app.listen({port:4000},()=>
 console.log(`server ready at http://localhost:4000${server.graphqlPath}`)
 );
};

startServer();