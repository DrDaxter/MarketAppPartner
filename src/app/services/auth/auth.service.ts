import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  hideHomeElements = new Subject<boolean>();
  constructor(
    private afAuth: AngularFireAuth
  ) { }

  getEventClicked(){
    return this.hideHomeElements.asObservable();
  }

  public loginWithEmail(email: string, password: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.afAuth.signInWithEmailAndPassword(email, password).then(res => {
        resolve(res);
      }).catch(err => {
        reject(err);
      });
    });
  }

  public registerWithEmail(email: string, password: string): Promise<firebase.auth.UserCredential> {
    return new Promise<firebase.auth.UserCredential>((resolve, reject) => {
      this.afAuth.createUserWithEmailAndPassword(email, password).then(res => {
        console.log('1 - createUserWithEmailAndPassword res: ', res);
        resolve(res);
      }).catch(err => {
        reject(err);
      });
    });
  }

}
