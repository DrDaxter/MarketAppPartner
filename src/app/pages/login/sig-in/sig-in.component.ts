import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-sig-in',
  templateUrl: './sig-in.component.html',
  styleUrls: ['./sig-in.component.scss']
})
export class SigInComponent implements OnInit {
  signForm!:FormControl; 
  validationMessage = {
    password: [
      {type: "required", message: "Password is required"},
    ],
    repeatPassword:[
      {type: "required", message: "Password is required"},
    ],
    email: [
      {type: "required", message: "Email is required"},
      {type: "pattern", message: "Email is invalid"}
    ],
  };
  constructor(
    private formBuilder:FormBuilder,
    private authService:AuthService
  ) { 
    
  }

  ngOnInit(): void {
  }

}
