import { IJwtPayload } from "./globaltypes";


declare global{
    namespace Express {
        interface Request{
            user:IJwtPayload;
        }   
    }
}

//export {} -> if error isnot solved