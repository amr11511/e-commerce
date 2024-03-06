import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Category } from 'src/app/shared/interfaces/product';
import { EcomdataService } from 'src/app/shared/services/ecomdata.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements  OnInit{
  constructor(private _EcomdataService:EcomdataService){}
  categories: Category[]= []; 
  ngOnInit(): void {
    this.getAllGat();
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
  // customOptions: OwlOptions = {
  //   loop: true,
  //   mouseDrag: true,
  //   touchDrag: true,
  //   pullDrag: false,
  //   dots: false,
  //   navSpeed: 500,
  //   autoplay: true,
  //   navText: ['', ''],
  //   responsive: {
  //     0: {
  //       items: 3
  //     },
  //     400: {
  //       items: 5
  //     },
  //     740: {
  //       items: 8
  //     },
  //     940: {
  //       items: 8
  //     }
  //   },
  //   nav: true
  // }

}
