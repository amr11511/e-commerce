import { Component, OnInit, Renderer2 } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { CartsService } from 'src/app/shared/cart/carts.service';
import { Category, Product } from 'src/app/shared/interfaces/product';
import { EcomdataService } from 'src/app/shared/services/ecomdata.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  constructor(private _EcomdataService:EcomdataService , private _CartsService:CartsService , private _ToastrService: ToastrService , private _Renderer2:Renderer2){}
  isLoading:boolean= false;
  products:Product[] = [];
  categories: Category[]= []; 
  searchInput:string ="";
  ngOnInit(): void {
    this.getProducts();
    this.getAllGat();
  }
  getProducts(){
    this.isLoading=true;
    this._EcomdataService.getAllProduct().subscribe({
      next: (response) => {
        this.products= response.data;
        this.isLoading=false;
      },
      error:(err)=>{
        console.log(err);
        this.isLoading=false; 
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
  getAllGat(){
    this._EcomdataService.getAllGategories().subscribe({
      next:(res)=>{
        console.log(res.data);
        this.categories = res.data;
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 500,
    autoplay: true,
    navText: ['', ''],
    responsive: {
      0: {
        items: 3
      },
      400: {
        items: 5
      },
      740: {
        items: 8
      },
      940: {
        items: 8
      }
    },
    nav: true
  }
  customOption: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    autoplay:true,
    pullDrag: false,
    dots: false,
    navSpeed: 500,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      }
    },
    nav: true}
}
