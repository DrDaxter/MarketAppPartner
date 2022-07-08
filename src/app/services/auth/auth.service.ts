import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  hideHomeElements = new Subject<boolean>();
  constructor() { }

  getEventClicked(){
    return this.hideHomeElements.asObservable();
  }
}
