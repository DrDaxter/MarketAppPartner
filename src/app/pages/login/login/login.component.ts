import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!:FormGroup;
  validationMessage = {
    password: [
      {type: "required", message: "Password is required"},
    ],
    email: [
      {type: "required", message: "Email is required"},
      {type: "pattern", message: "Email is invalid"}
    ],
  };

  constructor(
    private authService: AuthService,
    private formBuilder:FormBuilder,
  ) { 
    this.loginForm = this.formBuilder.group({
      password: new FormControl("",Validators.compose([
        Validators.required
      ])),
      email: new FormControl("",Validators.compose([
        Validators.required,
        Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")
      ]))
    })
  }

  ngOnInit(): void {
    this.emitToggle(false);
  }

  signIn(data:any){
    console.log(data);

    this.authService.loginWithEmail(data.email,data.password).then(resolve => {
      console.log(resolve);
    })
  }

  emitToggle(option:boolean){
    this.authService.hideHomeElements.next(option);
  }

}
