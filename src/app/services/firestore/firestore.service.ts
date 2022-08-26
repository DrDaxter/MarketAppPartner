import { Injectable } from '@angular/core';
import { 
  AngularFirestore, 
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from '@angular/fire/compat/firestore';

import { Firestore, collectionData, collection, query, } from '@angular/fire/firestore';
import { addDoc, doc, where } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { categories, ProductsClass } from 'src/app/models/products';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(
    private firestore: Firestore,
    private afs: AngularFirestore
  ) { }

  getByPath<T>(path:string): Promise<AngularFirestoreDocument<T>>{
    return new Promise(resolve => {
      resolve(this.afs.doc(path));
    });
  }
  
  addElement<T>(collectionName:string,item:any){//we use angular fire compact to be able to generate the id before save the data
    return new Promise(resolve => {
      item.uid = item.uid != null && item.uid != '' && item.uid != undefined ? item.uid : this.afs.createId();
      this.afs.doc<T>(`${collectionName}/${item.uid}`).set(item);
      resolve(item.uid);
    });
    
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
  //method with new angular 
  /* return new Promise(resolve => {
      const ref = collection(this.firestore,collectionName);
      const id = doc(collection(this.firestore,collectionName)).id;
      item.uid = id;
      addDoc(ref,item);
      resolve(id);
    }); */
}
