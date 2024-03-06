import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor( private _AuthService:AuthService, private _Router:Router){}
  msgErorr:string = '';
  isLoading:boolean=false;
  loginForm:FormGroup = new FormGroup({
    email:new FormControl('' ,[Validators.required , Validators.email]),
    password:new FormControl('' , [Validators.required , Validators.pattern(/^\w{6,}$/)])
  })
  handelLogin():any{
    if(this.loginForm.valid){
      this.isLoading = true ;
      this._AuthService.setLogin(this.loginForm.value).subscribe({
        next:(res)=>{  
          // console.log(res); 
          if(res.message == 'success'){
            this.isLoading = false ;
            localStorage.setItem('eToken' , res.token);
            this._AuthService.saveUserData()     
            this._Router.navigate(['/home'])
          } 
        },
        error:(err:HttpErrorResponse)=>{
          this.isLoading = false ;
          this.msgErorr = err.error.message
        }
      })
    }else{
      this.loginForm.markAllAsTouched();
    }
  }
  /************************/
  forgetPasswordForm : FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required , Validators.email] )
  })
  verifyResetCode:FormGroup = new FormGroup({
    resetCode:new FormControl('' , [Validators.required])
  })
  resetPassword:FormGroup = new FormGroup ({
    email:new FormControl('' , [Validators.required , Validators.email]),
    newPassword:new FormControl('' , [Validators.required , Validators.pattern(/^\w{6,}$/)])
  })
  /********************************/
  showForgetPassword:boolean = true;
  showVerifyResetCode:boolean=false;
  showResetPassword:boolean=false;
  msgStateEmail:string = '';
  emailForget:boolean=false;
  handelForgetPassword(){
    if(this.forgetPasswordForm.valid){
      this.emailForget = true;
      this._AuthService.forgetPASS(this.forgetPasswordForm.value).subscribe({
        next:(res)=>{
          console.log(res);
          this.msgStateEmail = res.message
          console.log(this.msgStateEmail);
          this.emailForget = false;
          this.showForgetPassword = false;
          this.showVerifyResetCode = true;
           
        },
        error:(err)=>{
          console.log(err);
          this.msgStateEmail=err.error.message;
          console.log(this.msgStateEmail);
          this.emailForget = false;
          
          
        }
      })
    }
  }
  msgStateCode:string = '';
  isResetCode:boolean = false;
  handelResetCode(){
    if(this.verifyResetCode.valid){
      this.isResetCode = true;
      this._AuthService.resetCode(this.verifyResetCode.value).subscribe({
        next:(res)=>{
          console.log(res);
          this.msgStateCode = res.status
          console.log(this.msgStateCode);
          this.isResetCode = false;
          this.showVerifyResetCode = false;
          this.showResetPassword = true;
        },
        error:(err)=>{
          console.log(err);
          this.msgStateCode = err.error.message
          console.log(this.msgStateCode); 
          this.isResetCode = false;
        }
      })
    }
  }
  msgStateNewPassword:string = '';
  isNewPass:boolean = false;
  handelMailNewPass(){
    if(this.resetPassword.valid){
      this.isNewPass = true;
      this._AuthService.newPass(this.resetPassword.value).subscribe({
        next:(res)=>{
          console.log(res);
          localStorage.setItem('eToken' , res.token);
          this._Router.navigate(['/login']);
          // this.msgStateNewPassword = res.status
          // console.log(this.msgStateNewPassword);
          this.isNewPass = false;
        },
        error:(err)=>{
          console.log(err);
          this.msgStateNewPassword = err.error.message
          // console.log(this.msgStateNewPassword); 
          this.isNewPass = false;
        }
      })
    }
  }
}
