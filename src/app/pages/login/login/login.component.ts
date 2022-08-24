import { Component, Inject, OnInit } from '@angular/core';

import { SignUpInterface } from 'src/app/interfaces/signupInterface';
import { AuthService } from 'src/app/services/auth/auth.service';
import { SessionStorageService } from 'src/app/services/sessionStorage/session-storage.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  show = false;
  isRegisterActive = false;
  constructor(
    private authService: AuthService,
    private sessionStorage:SessionStorageService
  ) { 
    
  }

  get getIsRegisterActive(){
    return this.sessionStorage.getItem('isRegisterActive');
  }

  ngOnInit(): void {
    this.emitToggle(false);
  }

  showRegister(){
    this.isRegisterActive = !this.isRegisterActive;
    this.sessionStorage.setItem('isRegisterActive',this.isRegisterActive);
  }

  registerNewUser(data:SignUpInterface){
    console.log(data.email);
    this.authService.registerWithEmail(data.email,data.password).then(resolve => {
      console.log(resolve);
    });
  }

  emitToggle(option:boolean){
    this.authService.hideHomeElements.next(option);
  }

}
