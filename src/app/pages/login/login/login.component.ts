import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SignUpInterface } from 'src/app/interfaces/signupInterface';
import { AuthService } from 'src/app/services/auth/auth.service';


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
  ) { 
    
  }

  ngOnInit(): void {
    this.emitToggle(false);
  }

  showRegister(){
    this.isRegisterActive = !this.isRegisterActive;
  }

  registerNewUser(data:SignUpInterface){
    console.log(data.email);
  }

  emitToggle(option:boolean){
    this.authService.hideHomeElements.next(option);
  }

}
