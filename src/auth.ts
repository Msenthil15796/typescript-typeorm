import { sign } from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET} from "./constants";
import { Users } from './entity/User';



export const createTokens=(user:Users)=>{

const accessToken =sign({userId:user.id},ACCESS_TOKEN_SECRET,{
                expiresIn:"15s"
            });

            return accessToken;
        }