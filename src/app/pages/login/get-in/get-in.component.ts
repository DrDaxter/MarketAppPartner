import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { SignUpInterface } from 'src/app/interfaces/signupInterface';

@Component({
  selector: 'app-get-in',
  templateUrl: './get-in.component.html',
  styleUrls: ['./get-in.component.scss']
})
export class GetInComponent implements OnInit {
  loginForm!:UntypedFormGroup;
  @Output() onLoginUser:EventEmitter<SignUpInterface> = new EventEmitter();
  validationMessage = {
    password: [
      {type: "required", message: "Password is required"},
      {type: "minlength", message: "Password must have 6 characters"},
    ],
    email: [
      {type: "required", message: "Email is required"},
      {type: "pattern", message: "Email is invalid"}
    ],
  };
  constructor(
    private formBuilder:UntypedFormBuilder,
  ) { 
    this.loginForm = this.formBuilder.group({
      password: new UntypedFormControl("",Validators.compose([
        Validators.required,
        Validators.minLength(6)
      ])),
      email: new UntypedFormControl("",Validators.compose([
        Validators.required,
        Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")
      ]))
    })
  }

  ngOnInit(): void {
  }

  login(data:SignUpInterface){
    this.onLoginUser.emit(data);
  }

}
