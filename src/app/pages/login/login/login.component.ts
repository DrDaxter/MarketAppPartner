import { Component, Inject, OnInit } from '@angular/core';

import { SignUpInterface } from 'src/app/interfaces/signupInterface';
import { UserInterface } from 'src/app/interfaces/userInterface';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';
import { SessionStorageService } from 'src/app/services/sessionStorage/session-storage.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  show = false;
  isRegisterActive = false;
  showLoader = false;
  userData:UserInterface = {
    displayName:"",
    email:"",
    image:"",
    name:"",
    lastName:"",
    uid:""
  };
  constructor(
    private authService: AuthService,
    private sessionStorage:SessionStorageService,
    private firestoreService:FirestoreService
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
    this.showLoader = true;
    this.authService.registerWithEmail(data.email,data.password).then(resolve => {
      const {user} = resolve;
      this.userData = {...this.userData, email: user?.email!!, uid:user!.uid}
      this.firestoreService.addElement('user',{...this.userData}).then(resolve2 =>{
        
        this.showLoader = false;
      })
    });
  }

  emitToggle(option:boolean){
    this.authService.hideHomeElements.next(option);
  }

}
