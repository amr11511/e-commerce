import { Component, OnInit } from '@angular/core';
import { Brands } from 'src/app/shared/interfaces/brands';
import { EcomdataService } from 'src/app/shared/services/ecomdata.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit {
  constructor(private _EcomdataService:EcomdataService){}
  allBrands:Brands = {} as Brands
  ngOnInit(): void {
    this._EcomdataService.GetAllBrands().subscribe({
      next:(res)=>{
        console.log(res);    
        this.allBrands = res;
      }
    })
  }
}
