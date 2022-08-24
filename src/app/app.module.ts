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
import { HeaderComponent } from './components/header/header.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatNativeDateModule} from '@angular/material/core';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { ProductsModule } from './pages/products/products.module';
import {MatBadgeModule} from '@angular/material/badge';
import { LoginModule } from './pages/login/login.module';
//import { FirebaseStorage } from '@angular/fire/storage';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
  ],
  imports: [
    ProductsModule,
    LoginModule,
    
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore()),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule.enablePersistence(),
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
    MatButtonModule,
    MatIconModule,
    MatBadgeModule
  ],
  providers: [
    { provide: SESSION_GENERAL_STORAGE, useExisting: SESSION_STORAGE },
    SessionStorageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
