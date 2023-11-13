import { Component, OnInit,Output,EventEmitter} from '@angular/core';
import { AbstractControl, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { SignUpInterface } from 'src/app/interfaces/signupInterface';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-sig-in',
  templateUrl: './sig-in.component.html',
  styleUrls: ['./sig-in.component.scss']
})
export class SigInComponent implements OnInit {
  signForm!:UntypedFormGroup;
  @Output() onNewUser:EventEmitter<SignUpInterface> = new EventEmitter();
  validationMessage = {
    password: [
      {type: "required", message: "Password is required"},
      {type: "minlength", message: "Password must have 6 characters"},
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
    private formBuilder:UntypedFormBuilder,
  ) { 
    this.signForm = this.formBuilder.group({
        password: new UntypedFormControl("",Validators.compose([
          Validators.required,
          Validators.minLength(6)
        ])),
        confirmPassword: new UntypedFormControl("", Validators.compose([
          Validators.required,
        ])),
        email: new UntypedFormControl("", Validators.compose([
          Validators.required,
          Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")
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