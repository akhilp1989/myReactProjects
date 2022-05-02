const uuidv4 = require('uuid').v4;

class LoginHelper {
constructor(){
    this.map = new Map();
}

validateLogin(data){
    return new Promise((resolve,reject)=>{
        const {email,pass} =  data;
        if(this.map.has(email) && this.map.get(email).password === pass){
            resolve(this.map.get(email));
        }
        else{
            reject('User not found');
        }
    })
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