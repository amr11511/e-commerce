import { Component, OnInit, Renderer2 } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CartsService } from 'src/app/shared/cart/carts.service';
import { Product } from 'src/app/shared/interfaces/product';
import { EcomdataService } from 'src/app/shared/services/ecomdata.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{
  constructor(private _EcomdataService:EcomdataService , private _CartsService:CartsService , private _ToastrService: ToastrService , private _Renderer2:Renderer2){}
  products:Product[] = [];
  searchInput:string ="";
  ngOnInit(): void {
    this.getProducts();
  }
  getProducts(){
    this._EcomdataService.getAllProduct().subscribe({
      next: (response) => {
        this.products= response.data;
      },
      error:(err)=>{
        console.log(err); 
      }
    })
  }
  addProductToCart(id:string , element:HTMLButtonElement):void{
    this._Renderer2.setAttribute(element , 'disabled' , 'true');
     this._CartsService.addToCart(id).subscribe({
       next:(res)=>{
         console.log(res);    
         this._ToastrService.success(res.message, 'Fresh Cart');
         this._Renderer2.removeAttribute(element,'disabled');
         this._CartsService.numberOfCart.next(res.numOfCartItems);       
       },
       error:(err)=>{
         console.log(err);      
         this._ToastrService.error(err.message, 'Fresh Cart');
         this._Renderer2.removeAttribute(element,'disabled')
       }
     })
   }
}
