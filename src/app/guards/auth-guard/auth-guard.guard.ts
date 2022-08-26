import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
  constructor(
    private authService:AuthService,
    private router:Router
  ){}
  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise<boolean>(resolve =>{
      this.authService.getUserActive().then(res => {
        console.log(!!res);
        if(!!res){
          resolve(true);
        }else{
          resolve(false);
          this.router.navigate(['login']);
        }
      }).catch(error => {
        resolve(false);
        this.router.navigate(['login']);
      })
    });
    
  }
  
}
