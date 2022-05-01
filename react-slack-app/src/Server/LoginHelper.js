const uuidv4 = require('uuid').v4;

class LoginHelper {
constructor(){
    this.map = new Map();
}

validateLogin(data){
    const {email,pass} =  data;
    if(this.map.has(email)){
        if(this.map.get(email).password === pass){
            return true;
        }
        else{
            return false;
        }
    }
    else{
        return false;
    }
}


createUserProfile(data){
   return new Promise((resolve,reject)=>{
   const email = data.email
   if(this.map.has(email)){
       reject('User Exist');
   }
   this.map.set(email,data);
   resolve(this.map.get(email));
   })
}

}

module.exports = LoginHelper