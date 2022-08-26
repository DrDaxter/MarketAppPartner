import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/products/products/products.component';
import { ManageProductComponent } from './pages/products/manage-product/manage-product.component';
import { AuthGuardGuard } from './guards/auth-guard/auth-guard.guard';


const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent, canActivate:[AuthGuardGuard]},
  {path: 'product', component: ProductsComponent, canActivate:[AuthGuardGuard]},
  {path: 'manageProductComponent', component: ManageProductComponent, canActivate:[AuthGuardGuard]}
];  

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
