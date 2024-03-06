import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { data } from 'src/app/shared/interfaces/brands';
import { EcomdataService } from 'src/app/shared/services/ecomdata.service';

@Component({
  selector: 'app-brand-detailes',
  templateUrl: './brand-detailes.component.html',
  styleUrls: ['./brand-detailes.component.css']
})
export class BrandDetailesComponent implements OnInit{
  constructor(private _EcomdataService:EcomdataService , private _ActivatedRoute:ActivatedRoute){}
  baradID:any = ''
  brandDetails:data = {} as data
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next:(param)=>{
        this.baradID = param.get('id')
      }
    })
    this._EcomdataService.GetspecificBrand(this.baradID).subscribe({
      next:(res)=>{
        this.brandDetails = res.data;
        console.log(res);
        
      }
    })
  }
}
