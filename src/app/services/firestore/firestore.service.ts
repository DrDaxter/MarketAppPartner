import { Injectable, inject } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/compat/firestore';

import { Firestore, collectionData, collection, query, setDoc, doc} from '@angular/fire/firestore';
import { where } from 'firebase/firestore';
import { Observable, map } from 'rxjs';
import { FirestoreAddDocItem } from 'src/app/types/firestoreTypes/mainTypes';
import { FirebaseStorageService } from '../forebaseStorage/firebase-storage.service';
import { Products } from 'src/app/interfaces/poduct/ProductInterface';

interface SaveResponse{
  data:string
}

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(
    private firestore: Firestore,
    private afs: AngularFirestore,
    private cloudStorage: FirebaseStorageService
  ) {

  }

  getByPath<T>(path:string): Promise<AngularFirestoreDocument<T>>{
    return new Promise(resolve => {
      resolve(this.afs.doc(path));
    });
  }

  addElement(collectionName:string,item:any): Promise<string>{//we use angular fire compact to be able to generate the id before save the data
    item.id = this.afs.createId();
    this.afs.doc(`${collectionName}/${item.id}`).set(item);
    return item.uid;
  }

  update<T>(collection: string, uid: string, document:any){
    return this.afs.doc<T>(`${collection}/${uid}`).update(document);
  }

  getAll<T>(collectionName:string): Observable<T[]>{
    const ref = collection(this.firestore, collectionName);
    return collectionData(ref) as Observable<T[]>;
  }

  getWhere1<T>():Observable<T[]>{
    const ref = collection(this.firestore, 'product');
    const data = query(ref, where("commerce_uid", "==", "cSb4yeU6BwCsGgNthPV2"));
    console.log(data);
    return collectionData(data) as Observable<T[]>;
  }

  /* getProducts():Observable<Products[]>{
    const ref = collection(this.firestore, 'product');
    const data = query(ref, where("commerce_uid", "==", "cSb4yeU6BwCsGgNthPV2"));
    const data$ = collectionData(data) as Observable<Products[]>;
    const pipeData$ = data$.pipe(
      map((element,index) => {
        console.log(index)
        return element[index]
      })
    );
    return pipeData$;
  } */

  getWhere2<T>(collectionName:string,key:string,value:string):Observable<T[]>{
    const ref = collection(this.firestore, collectionName);
    const data = query(ref, where(key, "==", value));
    return collectionData(data) as Observable<T[]>;
  }

  addDocument(collectionName:string, data:FirestoreAddDocItem, id:string):Promise<void>{
    try{
      data.uid = id;
      const response = setDoc(doc(this.firestore,collectionName,data.uid), data);
      return response;
    }catch(e){
      console.log(e)
      throw new Error("Ocurrio un error");
    }
  }

  manualId():string{
    return this.afs.createId();
  }
}
