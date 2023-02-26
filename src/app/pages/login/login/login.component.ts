import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SignUpInterface } from 'src/app/interfaces/signupInterface';
import { UserInterface } from 'src/app/interfaces/userInterface';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';
import { ModalsServiceService } from 'src/app/services/modalsService/modals-service.service';
import { SessionStorageService } from 'src/app/services/sessionStorage/session-storage.service';
import { environment } from 'src/environments/environment';


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
    private firestoreService:FirestoreService,
    private modalsService:ModalsServiceService,
    private router:Router,
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

  loginUser(data:SignUpInterface){
    this.showLoader = true;
     this.authService.loginWithEmail(data.email,data.password).then(resolve => {
      console.log(resolve);
      this.showLoader = false;
      this.modalsService.showSimpleModal('300px',"WELCOME","See what we have for you",true,false,"Thanks!");
      this.emitToggle(true);
      this.router.navigate(['home']);
    }).catch(error => {
      this.showLoader = false;
      this.modalsService.showSimpleModal('300px',"Ups something went wrong","Do you have already an account?",true,false,"Ok");
      console.log(error);
    });
  }

  registerNewUser(data:SignUpInterface){
    this.showLoader = true;
    this.authService.registerWithEmail(data.email,data.password).then(resolve => {
      const {user} = resolve;
      this.userData = {...this.userData, email: user?.email!!,image:environment.generalAvatar, uid:user!.uid}
      this.firestoreService.addElement('user',{...this.userData}).then(() =>{
        this.showLoader = false;
        this.modalsService.showSimpleModal('300px',"User has been created","Now you have a new user :D",true,false,"Ok");
        this.removeSessionVar()
      })
    }).catch(error => {
      this.showLoader = false;
      console.log(error);
    });
  }

  emitToggle(option:boolean){
    this.authService.hideHomeElements.next(option);
  }

  removeSessionVar(){
    this.sessionStorage.removeItem('isRegisterActive')
  }
}
