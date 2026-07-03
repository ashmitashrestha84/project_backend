import bcrypt from "bcryptjs";

//* hash password
export const hashPassword=async(password:string)=>{
    try{
        //salt -> used to remove hash collision
        const salt= await bcrypt.genSalt(10); 
        //hash
        const hash= await bcrypt.hash(password,salt);   //async function
        return hash;
    }
    catch(error){
        console.log(error);
        throw error;
    }

}



//* compare password