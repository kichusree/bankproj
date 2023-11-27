import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';
// global header for overload
const options ={
  headers:new HttpHeaders()
}


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient) { }

  // token header method
  getToken(){
    // header create
    const headers  = new HttpHeaders()
  
    const token= JSON.parse(localStorage.getItem("token")||"")
    if(token){
     options.headers=headers.append('access_token',token)
    }
     return options
  }

  
  registerApi(acno:any,uname:any,psw:any){
   const body={
    acno,uname,psw
   }
   return this.http.post('http://localhost:3000/register',body)

  }
  loginApi(acno:any,psw:any){
    const body={
     acno,psw
    }
    return this.http.post('http://localhost:3000/login',body)
 
   }
   balanceApi(acno:any){
    return this.http.get('http://localhost:3000/balance/' +acno,this.getToken())
   }

   getUserApi(acno:any)
   {
    return this.http.get('http://localhost:3000/getUser/' +acno,this.getToken())
   }

   fundTransfer(toAcno:any,fromAcno:any,amount:any,psw:any,date:any)
   {
    const body={
      toAcno,fromAcno,amount,psw,date
    }
    return this.http.post('http://localhost:3000/transfer' ,body,this.getToken())
   }
  //  api to get transaction history
  transactionHistory(acno:any){
    return this.http.get('http://localhost:3000/transaction/'+acno,this.getToken())
  }
  deleteAccount(acno:any){
return this.http.delete('http://localhost:3000/deleteAc/'+acno,this.getToken())
  }
}
