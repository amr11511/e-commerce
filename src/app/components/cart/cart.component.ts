import { Component, OnInit } from '@angular/core';
import { CartsService } from 'src/app/shared/cart/carts.service';
import { Carts } from 'src/app/shared/interfaces/carts';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
 constructor(private _CartsService:CartsService){}
 carts:any = null;
 removeItem(id:string):void{
  this._CartsService.removeCartList(id).subscribe({
    next:(res)=>{
      this.carts = res.data
      console.log(res.data);
      
    },
    error:(err)=>{
      console.log(err);     
    }
  })
 }
 removeAllCart():void{
  this._CartsService.removeAllCartList().subscribe({
    next:(res)=>{
      console.log(res);
      if(res.message === "success"){
        this.carts = null;
        this._CartsService.numberOfCart.next(0); 
      }
      
    },
    error:(err)=>{
      console.log(err);
      
    }
  })
 }
 updateCount(id:string , count:number):void{
  if(count > 0){
    this._CartsService.updateQuantity(id , count).subscribe({
      next:(res)=>{
        console.log(res);
        this.carts = res.data
        
      },
      error:(err)=>{
        console.log(err);     
      }
    })
  }
 }
 ngOnInit(): void {
   this._CartsService.getCartList().subscribe({
      next:(res)=>{
        console.log(res.data);
        this.carts = res.data;        
      },
      error:(err)=>{
        console.log(err);       
      }
   })
 }

 
}
