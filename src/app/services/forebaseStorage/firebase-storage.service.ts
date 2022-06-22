import { Injectable } from '@angular/core';
import { Storage,ref, uploadBytes } from '@angular/fire/storage';
import { getStorage } from "firebase/storage";

@Injectable({
  providedIn: 'root'
})
export class FirebaseStorageService {

  constructor(
    //private storage: Storage
  ) { 
    
  }

  uploadImage(file:any,id:string){
    const storage = getStorage();
    const imageRef = ref(storage,`/products/product-${id}/${id}`);

    return uploadBytes(imageRef, file);
  }

}
