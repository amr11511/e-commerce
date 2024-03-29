import { Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import { CartsService } from 'src/app/shared/cart/carts.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-nav-blank',
  templateUrl: './nav-blank.component.html',
  styleUrls: ['./nav-blank.component.css']
})
export class NavBlankComponent implements OnInit{
  constructor(private _AuthService:AuthService , private _CartsService:CartsService , private _Renderer2:Renderer2){}
  @ViewChild('navBar')  navElement!:ElementRef;
  @HostListener('window:scroll')
  onScroll():void{
    if(scrollY > 500){
      this._Renderer2.addClass(this.navElement.nativeElement, 'px-5')
      this._Renderer2.addClass(this.navElement.nativeElement, 'shadow')

    }else{
      this._Renderer2.removeClass(this.navElement.nativeElement, 'px-5')
      this._Renderer2.removeClass(this.navElement.nativeElement, 'shadow')

    }
  }



  numberCart:number = 0;
  ngOnInit(): void {
    this._CartsService.numberOfCart.subscribe({
      next:(data)=>{
        console.log(data);   
        this.numberCart = data  
      }
    })
    this._CartsService.getCartList().subscribe({
      next:(res)=>{
        this.numberCart = res.numOfCartItems;
      }
    })    
  }
  logoutUser(){
    this._AuthService.logout()
  }
}
