import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/shared/interfaces/product';
import { EcomdataService } from 'src/app/shared/services/ecomdata.service';

@Component({
  selector: 'app-categories-detailes',
  templateUrl: './categories-detailes.component.html',
  styleUrls: ['./categories-detailes.component.css']
})
export class CategoriesDetailesComponent implements OnInit{
    constructor(private _EcomdataService:EcomdataService , private _ActivatedRoute:ActivatedRoute){}
    categID:any ='';
    CategoryDetails : Category= {} as Category
    ngOnInit(): void {
      this._ActivatedRoute.paramMap.subscribe({
        next:(param)=>{
          this.categID = param.get('id');
        }
      })

      this._EcomdataService.specificCategory(this.categID).subscribe({
        next:(res)=>{
          console.log(res);  
          this.CategoryDetails = res.data        
        }
      })
    }
}
