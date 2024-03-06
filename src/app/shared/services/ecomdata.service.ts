import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EcomdataService {
  baseUrl:string = 'https://ecommerce.routemisr.com'

  constructor(private _HttpClient:HttpClient) { }
  getAllProduct():Observable<any>
  {
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/products`)
  }
  getDetProduct(id:string):Observable<any>{
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
  }
  getAllGategories():Observable<any>{
    return this._HttpClient.get(`${this.baseUrl}/api/v1/categories`);
  }
  specificCategory(id:string):Observable<any>{
    return this._HttpClient.get(this.baseUrl +`/api/v1/categories/${id}`);
  }
  GetAllBrands():Observable<any>{
    return this._HttpClient.get(this.baseUrl+`/api/v1/brands`);
  }
  
  GetspecificBrand(id:string):Observable<any>{
    return this._HttpClient.get(this.baseUrl+`/api/v1/brands/${id}`)
  }
}
