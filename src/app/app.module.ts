import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { SESSION_STORAGE } from 'ngx-webstorage-service';
import { SESSION_GENERAL_STORAGE,SessionStorageService } from './services/sessionStorage/session-storage.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//angular fire
import { environment } from 'src/environments/environment';
import { provideFirebaseApp, initializeApp} from '@angular/fire/app';
import { getFirestore,provideFirestore } from '@angular/fire/firestore'

import {AngularFireModule,} from '@angular/fire/compat';
import {AngularFirestoreModule} from '@angular/fire/compat/firestore';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
//material component
import { MatSliderModule } from '@angular/material/slider';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatNativeDateModule} from '@angular/material/core';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatBadgeModule} from '@angular/material/badge';
import {MatCardModule} from '@angular/material/card';

import { HeaderComponent } from './components/header/header.component';
import { ProductsModule } from './pages/products/products.module';
import { LoginModule } from './pages/login/login.module';
import { SimpleModalComponent } from './components/simple-modal/simple-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AddProductComponent } from './components/add-product/add-product.component';
//charts
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    SimpleModalComponent,
    SimpleModalComponent,
    AddProductComponent,
  ],
  imports: [
    ProductsModule,
    LoginModule,
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore()),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule.enablePersistence(),
    NgxChartsModule,
    AngularFireAuthModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatNativeDateModule,
    MatListModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatBadgeModule,
    MatCardModule
  ],
  providers: [
    { provide: SESSION_GENERAL_STORAGE, useExisting: SESSION_STORAGE },
    SessionStorageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
