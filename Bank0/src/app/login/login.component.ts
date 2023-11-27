
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { DataService } from '../service/data.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  implements OnInit {
  data="hi"
  plac="enter acno"
  acno:any
  uname:any
  psw:any
  public resetPasswordEmail!:string
  public isValidEmail!:boolean
  constructor(private rout:Router,private fb:FormBuilder,private ds:DataService){}
  
  // model 
  loginForm=this.fb.group(
    {
      acno:['',[Validators.required,Validators.pattern('[0-9]+')]],
      psw:['',[Validators.required,Validators.pattern('[0-9a-zA-Z]+')]]
    }

  )
ngOnInit(): void {
 
}

  
login(){

  if(this.loginForm.valid){
    // alert("successfully loged in")
   var modelPath=this.loginForm.value
   this.ds.loginApi(modelPath.acno,modelPath.psw).subscribe((result:any)=>{

    // store token in local storage
    localStorage.setItem("token",JSON.stringify(result.token))
    //  console.log(result)
    alert(result.message);
    this.rout.navigateByUrl("home")
    localStorage.setItem("currentAcno",result.currentAcno)
    localStorage.setItem("currentUser",result.currentUser)
   },
   result=>{
    alert(result.error.message)
   }
   )
  }
  else
     alert("invalid form")
}
checkValidEmail(event:string){
  const value=event;
  const pattern= /^[\w-\.]+@([\w-]+\.)[\w-]{2,3}$/;
  this.isValidEmail=pattern.test(value)

  }
}