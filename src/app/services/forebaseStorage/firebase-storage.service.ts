import { Injectable } from '@angular/core';
import { ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';
import { UploadResult, getStorage } from "firebase/storage";
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseStorageService {
  storage = getStorage();
  constructor(
    //private storage: Storage
  ) {

  }

  uploadImage(file:any,id:string):Promise<UploadResult>{
    const imageRef = ref(this.storage,`/products/product-${id}/${id}`);

    return uploadBytes(imageRef, file);
  }

  getMetadata(fileRef:string):Observable<string>{
    try{
      const imageRef = ref(this.storage, fileRef);
      const metadata = getDownloadURL(imageRef);
      return from(metadata);
    }catch(e){
      console.log(e);
      throw new Error("Something went wrong");
    }
  }

}
