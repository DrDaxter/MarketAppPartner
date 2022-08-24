import { Component, OnInit,Output,EventEmitter} from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { SignUpInterface } from 'src/app/interfaces/signupInterface';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-sig-in',
  templateUrl: './sig-in.component.html',
  styleUrls: ['./sig-in.component.scss']
})
export class SigInComponent implements OnInit {
  signForm!:FormGroup;
  @Output() onNewUser:EventEmitter<SignUpInterface> = new EventEmitter();
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
    });
    this.signForm.addValidators(
      this.createCompareValidator(
        this.signForm.get('password'),
        this.signForm.get('confirmPassword')
      )
     );
  }

  get passwordMatchError() {
    return (
      this.signForm.hasError('mismatch') &&
      this.signForm.get('confirmPassword')?.touched
    );
  }

  ngOnInit(){
  }

  sigIn(data:SignUpInterface){
    this.onNewUser.emit(data);
  }  

  createCompareValidator(controlOne: AbstractControl | null, controlTwo: AbstractControl | null) {
    return () => {
      if (controlOne?.value !== controlTwo?.value)
        return { match_error: 'Value does not match' }; 
      return null;
    };
  }

}