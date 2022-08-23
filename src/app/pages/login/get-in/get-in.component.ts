import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-get-in',
  templateUrl: './get-in.component.html',
  styleUrls: ['./get-in.component.scss']
})
export class GetInComponent implements OnInit {
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
  }

  login(data:any){
    console.log(data);

   /*  this.authService.loginWithEmail(data.email,data.password).then(resolve => {
      console.log(resolve);
    }) */
  }

}
