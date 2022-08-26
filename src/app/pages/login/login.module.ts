import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material/dialog';
import { SigInComponent } from './sig-in/sig-in.component';
import { GetInComponent } from './get-in/get-in.component';


@NgModule({
  declarations: [
    LoginComponent,
    SigInComponent,
    GetInComponent,
  ],
  imports: [
    CommonModule,
    MatGridListModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    BrowserAnimationsModule
  ],
  exports:[
    LoginComponent
  ]
})
export class LoginModule { }
