const db =require('./db')
// import jwt
const  jwt =require('jsonwebtoken')

register =(acno,uname,psw)=>{
   return  db.User.findOne({acno}).then(user=>{
        if(user){
            return {
                message: "user already exist",
                status: false,
                statusCode: 404
              } 
        }
        else{
            newuser = new db.User({
                acno: acno,
                uname: uname,
                psw: psw, balance: 0,
                transactions: []
        
    })
    newuser.save()

    return {
      message: "reg successfully",
      status: true,
      statusCode: 200
    }
}
})
}
login = (acno, psw) => {
    return db.User.findOne({ acno, psw }).then(user => {
      if (user) {
        // token generation
        // supersecretkey123 is string used for verification
        const token=jwt.sign({currentAcno:acno},"secretkey123")
        return {
          message: "login successfully",
          status: true,
          statusCode: 200,
          currentUser: user.uname,
          currentAcno: user.acno,
         token
          // loggined user will be assigned a token.Token is then  send to client
        }
      }
      else {
        return {
          message: "incorrect acno/psw",
          status: false,
          statusCode: 401
        }
      }
    })
   
  }
  getBalance = (acno) => {
    return db.User.findOne({ acno }).then(user => {
      if (user) {
        return {
          message: user.balance,
          status: true,
          statusCode: 200
        }
      }
      else {
        return {
          message: "incorrect acno",
          status: false,
          statusCode: 401
        }
      }
    })
  }
  getUser = (acno) => {
    return db.User.findOne({ acno }).then(user => {
      if (user) {
        return {
          message: user,
          status: true,
          statusCode: 200
        }
      }
      else {
        return {
          message: "incorrect acno",
          status: false,
          statusCode: 401
        }
      }
    })
  }
  fundTransfer=(toAcno,fromAcno,amount,psw,date)=>{
    let  amnt=parseInt(amount)
    return db.User.findOne({acno:fromAcno,psw}).then(result=>{
      if(result){
       
             return db.User.findOne({acno:toAcno}).then(data=>{
              if(data){
               if(amnt>result.balance){
                return {
                  message: "insufficient balance",
                  status: false,
                  statusCode: 404
                }
               }
               else{
                result.balance-=amnt
                result.transactions.push(
                  {
                  type:"DEBIT",
                  amount:amnt,
                date
                  }
             )
             result.save()

             data.balance+=amnt
             data.transactions.push(
              {
              type:"CREDIT",
              amount:amnt,
            date
              }
         )
         data.save()
         
         return{
          message: "transaction success",
          status: true,
          statusCode: 200,
          balance:result.balance
         }
            }
               }
              
              else{
                return {
                  message: "invalid credit credential",
                  status: false,
                  statusCode: 404
                }
              }
             })
      }
      else {
        return {
          message: "invalid debit credential",
          status: false,
          statusCode: 404
        }
      }
    })
  }
  getTransaction=(acno)=>{
    return db.User.findOne({acno}).then(user=>{
   if(user){
    return{
      message: user.transactions,
      status: true,
      statusCode: 200
    }
   }
   else{
    return{
    message: "invalid user",
    status: false,
    statusCode: 404
   }
  }
    })
  }
  deleteAc =(acno)=>{
    return db.User.deleteOne({acno}).then(deleteCount=>{
      if(deleteCount){
        return{
          message:"user deleted",
          status: true,
          statusCode: 200
        }
      }
      else{
        return{
          message: "invalid user",
          status: false,
          statusCode: 404
         }
      }
    })
  }
module.exports={
    register,login,getBalance,getUser,fundTransfer,getTransaction,deleteAc
}