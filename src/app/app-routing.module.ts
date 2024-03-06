import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlankLayoutComponent } from './components/blank-layout/blank-layout.component';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductsComponent } from './components/products/products.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { BrandsComponent } from './components/brands/brands.component';
import { AuthLayoutComponent } from './components/auth-layout/auth-layout.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { gardsGuard } from './shared/auth/gards.guard';
import { DetailsComponent } from './components/details/details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
// import { AllordersComponent } from './components/allorders/allorders.component';
import { CategoriesDetailesComponent } from './components/categories-detailes/categories-detailes.component';
import { BrandDetailesComponent } from './components/brand-detailes/brand-detailes.component';

const routes: Routes = [
  { path: '', canActivate:[gardsGuard] ,component:BlankLayoutComponent , children:[
    {path:'',redirectTo:"home",pathMatch:"full"},
    {path:"home", component:HomeComponent , title:"home"},
    {path:"cart", component:CartComponent , title:"cart"},
    {path:"products", component:ProductsComponent , title:"products"},
    {path:"checkout/:id" , component:CheckoutComponent , title:"Check Out"},
    {path:'allorders' , component:NotfoundComponent, title:'All orders'},
    {path:"productDetailes/:id", component:DetailsComponent , title:"productDetails"},
    {path:"categories", component:CategoriesComponent , title:"categories"},
    {path:"categoriesDetailes/:id", component:CategoriesDetailesComponent , title:"categories"},
    {path:"brands", component:BrandsComponent , title:"brands"},
    {path:"brandsDet/:id", component:BrandDetailesComponent , title:"brands"},
  ] },
  {path:'' , component:AuthLayoutComponent , children:[
    {path:'login' , component:LoginComponent , title:'login'},
    {path:'register' , component:RegisterComponent , title:'register'}
  ]},
  {path:'**' , component:NotfoundComponent , title:'NotFoundPage'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes , {scrollPositionRestoration:'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
