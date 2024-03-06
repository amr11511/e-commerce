import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private _AuthService:AuthService , private _Router:Router){}
  msgErorr:string = '';
  isLoading:boolean=false;
  registerForm:FormGroup = new FormGroup({
    name: new FormControl('' , [Validators.required , Validators.minLength(3) , Validators.maxLength(20)]),
    email: new FormControl('' , [Validators.required , Validators.email]),
    password: new FormControl('' , [Validators.required ,  Validators.pattern(/^\w{6,}$/)]),
    rePassword: new FormControl('', [Validators.required ]),
    phone: new FormControl('' , [Validators.required ,  Validators.pattern(/^01[0125][0-9]{8}$/)]),
  },{validators: this.conformationPass})

  conformationPass(g:any){
    if(g.get('password').value === g.get('rePassword').value ){
      return null;
    }else{
      g.get('rePassword').setErrors({'Mismatch' : 'Not Matched'});
      return {'Mismatch':'Not Matched'};
    }
  }
  onSubmit():any{
    if(this.registerForm.valid){
      this.isLoading = true ;
      this._AuthService.setRegister(this.registerForm.value).subscribe({
        next:(res)=>{
          this.isLoading = false ;
          this._Router.navigate(['/login']);
        },
        error:(err:HttpErrorResponse)=>{
          this.isLoading = false ;
          this.msgErorr= err.error.message;
        }
      })
    }
  }
}
