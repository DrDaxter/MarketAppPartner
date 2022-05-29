import { Injectable } from '@angular/core';
import { Firestore, collectionData, collection, query } from '@angular/fire/firestore';
import { where } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(
    private firestore: Firestore
  ) { }

  getAll(){
    const ref = collection(this.firestore, 'product');
    const data = query(ref, where("commerce_uid", "==", "cSb4yeU6BwCsGgNthPV2"));
    console.log(data);
    return collectionData(data);
  }
}
