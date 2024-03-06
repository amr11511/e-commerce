import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { CartsService } from 'src/app/shared/cart/carts.service';
import { Product } from 'src/app/shared/interfaces/product';
import { EcomdataService } from 'src/app/shared/services/ecomdata.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
  constructor(private _ActivatedRoute:ActivatedRoute , private _EcomdataService:EcomdataService , private _CartsService:CartsService , private _ToastrService: ToastrService){}
  proDet:Product = {} as Product;
  isLoad:boolean=false;
  idPara:string = '';
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe((res:any)=>{
      this.idPara = res.get('id');
    })
    this.getProductDetails();
  }
  getProductDetails(){
    this.isLoad = true;
    this._EcomdataService.getDetProduct(this.idPara).subscribe({
      next:(res)=>{
        console.log(res);
        this.proDet= res.data
        this.isLoad = false;
      },
      error:(err)=>{
        console.log(err); 
        this.isLoad = false; 
      }
    })
  }
  isCartLoading:boolean = false;
  addProductToCart(id:string):void{
    this.isCartLoading= true;
    this._CartsService.addToCart(id).subscribe({
      next:(res)=>{
        console.log(res);
        this.isCartLoading= false;
        this._ToastrService.success(res.message, 'Fresh Cart');
        this._CartsService.numberOfCart.next(res.numOfCartItems);  
        
      },
      error:(err)=>{
        console.log(err); 
        this.isCartLoading= false; 
      }
    })
  }
  customOptions: OwlOptions = {
    autoplay: true,
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      }
    },
    nav: true
  }
}
