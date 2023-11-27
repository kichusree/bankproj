import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DataService } from '../service/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  acno:any
  uname:any
  psw:any
  cpsw:any
  pswCheck:any=false
  constructor(private fb:FormBuilder,private ds:DataService,private router:Router){}
  registerForm=this.fb.group({
    acno:['',[Validators.required,Validators.pattern('[0-9]+')]],
    uname:['',[Validators.required,Validators.pattern('[a-zA-Z]+')]],
    psw:['',[Validators.required,Validators.pattern('[0-9a-zA-Z]+')]],
    cpsw:['',[Validators.required,Validators.pattern('[0-9a-zA-Z]+')]]
  })
  ngOnInit(): void {
      
  }
  register(){
    var modelPath=this.registerForm.value
    console.log(modelPath.acno)
//  alert(this.registerForm.value.uname)
if(this.registerForm.valid){
  if(this.registerForm.value.psw==this.registerForm.value.cpsw)
  {
    this.ds.registerApi(this.registerForm.value.acno,this.registerForm.value.uname,this.registerForm.value.psw).subscribe((result:any)=>{
       console.log(result)
       alert(result.message);
       this.router.navigateByUrl('')
    },
    result=>{
      alert(result.error.message)
      this.router.navigateByUrl('')
    }
    )
  }
  else{
    // alert("password don't match")
  this.pswCheck=true
  }
}
else
   alert("reg not")
  }

}
