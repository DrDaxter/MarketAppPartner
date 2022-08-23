import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-sig-in',
  templateUrl: './sig-in.component.html',
  styleUrls: ['./sig-in.component.scss']
})
export class SigInComponent implements OnInit {
  signForm!:FormGroup; 
  validationMessage = {
    password: [
      {type: "required", message: "Password is required"},
    ],
    confirmPassword:[
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
    this.signForm = this.formBuilder.group({
        password: new FormControl("",Validators.compose([
          Validators.required
        ])),
        confirmPassword: new FormControl("", Validators.compose([
          Validators.required
        ])),
        email: new FormControl("", Validators.compose([
          Validators.required
        ]))
      },
      [CustomValidators.MatchValidator('password', 'confirmPassword')]
    );
  }

  get passwordMatchError() {
    return (
      this.signForm.getError('mismatch') &&
      this.signForm.get('confirmPassword')?.touched
    );
  }

  ngOnInit(){
  }

  sigIn(data:any){

  }  

}

//custom confirm password validator
class CustomValidators{
  static MatchValidator(source: string, target: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const sourceCtrl = control.get(source);
      const targetCtrl = control.get(target);

      return sourceCtrl && targetCtrl && sourceCtrl.value !== targetCtrl.value
        ? { mismatch: true }
        : null;
    };
  }
}