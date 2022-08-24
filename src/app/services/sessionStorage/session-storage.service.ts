import { Inject, Injectable, InjectionToken } from '@angular/core';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';

export const SESSION_GENERAL_STORAGE = new InjectionToken<StorageService>('SESSION_GENERAL_STORAGE');
@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  constructor(
    @Inject(SESSION_GENERAL_STORAGE) private storage: StorageService
  ) { }

  getItem(key:string){
    const value = this.storage.get(key);
    return value !== undefined ? value : null;
  }

  setItem(key:string, value:string | boolean){
    this.storage.set(key,value);
  }
}
