import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { UserInterface } from 'src/app/interfaces/userInterface';
import { FirestoreService } from '../firestore/firestore.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  hideHomeElements = new Subject<boolean>();
  authSubscription?:Subscription;
  fireSubscription?:Subscription;
  constructor(
    private afAuth: AngularFireAuth,
    private firestore: FirestoreService
  ) { }

  getEventClicked(){
    return this.hideHomeElements.asObservable();
  }

  getUserActive(): Promise<UserInterface>{
    return new Promise((resolve,rejects) =>{
      if(this.authSubscription){console.log(this.authSubscription); this.authSubscription.unsubscribe();}
      this.authSubscription = this.afAuth.authState.subscribe((userState: firebase.User | null) =>{
        if(userState){
          this.firestore.getByPath<UserInterface>(`user/${userState.uid}`).then(userData => {
            if(this.fireSubscription){this.fireSubscription.unsubscribe();}
            this.fireSubscription = userData.valueChanges().subscribe((User:UserInterface | undefined) => {
              if(User){
                resolve(User);
              }else{
                console.log("No user was found in get by path");
                rejects(false);
              }
            })
          }).catch(error => {
            console.log("Get user by path error: "+error);
            rejects(false);
          });
        }else{
          console.log("No user was found in authState");
          rejects(false);
        }
      });
    });
   
  }

  public loginWithEmail(email: string, password: string): Promise<firebase.auth.UserCredential> {
    return new Promise<firebase.auth.UserCredential>((resolve, reject) => {
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

  public logout(): Promise<boolean>{
    return new Promise(resolve => {
      this.afAuth.signOut().then(() =>{
        resolve(true);
      }).catch(error => {
        console.log(error);
        resolve(false);
      })
    })
  }
}
