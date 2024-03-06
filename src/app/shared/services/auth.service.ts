import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private _HttpClient:HttpClient , private _Router:Router) { }
  decodeUser:any;
  logout():void{
    localStorage.removeItem('eToken');
    this._Router.navigate(['/login']);
  }
  saveUserData(){
    if(localStorage.getItem('eToken') != null){
      let encode:any = localStorage.getItem('eToken');
      let decode = jwtDecode(encode);
      this.decodeUser = decode;
      console.log(decode);
      
    }
  }
  setRegister(regData:object):Observable<any>{
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`,regData);
  }
  setLogin(logData:object):Observable<any>{
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`,logData);
  }
  forgetPASS(email:object):Observable<any>{
    return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords' , email);
  }
  resetCode(resetCode:object):Observable<any>{
    return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode' , resetCode);
  }
  newPass(userData:object):Observable<any>{
    return this._HttpClient.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword' , userData);
  }
}