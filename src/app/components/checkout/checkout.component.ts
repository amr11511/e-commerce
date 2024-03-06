import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CartsService } from 'src/app/shared/cart/carts.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit{
    constructor(private _FormBuilder:FormBuilder , private _ActivatedRoute:ActivatedRoute , private _CartsService:CartsService){}
    cartId:any = '';
    isCheckLoading:boolean = false;
    checkoutForm:FormGroup = this._FormBuilder.group({
      details : ['' , Validators.required],
      phone:['' , Validators.required],
      city:['' , Validators.required]
    })
    ngOnInit(): void {
      this._ActivatedRoute.paramMap.subscribe({
        next:(param)=>{
          this.cartId = param.get('id')         
        }
      })
    }
    handelCheckOut():void{
      console.log(this.checkoutForm.value);
      if(this.checkoutForm.valid){
        this.isCheckLoading = true;
        this._CartsService.payment(this.cartId , this.checkoutForm.value).subscribe({
          next:(res)=>{
            console.log(res);

            if(res.status == "success"){
              window.open(res.session.url,'_self');
            }
            this.isCheckLoading = false;
            
          }
        })
      }
      
    }
}
