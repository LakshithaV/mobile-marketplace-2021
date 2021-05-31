import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import 'firebase/firestore';
import { Observable } from 'rxjs';
import { Item } from '../../models/item.interface';
@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(public firestore: AngularFirestore) { }

  createItem(
    itemName: string,
    itemPrice: number,
    itemDescription: string,
    itemCategory: string,
    itemStock: number
  ): Promise<void>{
    const id = this.firestore.createId();

    return this.firestore.doc(`itemList/${id}`).set({
      id,
      itemName,
      itemPrice,
      itemDescription,
      itemCategory,
      itemStock,
    })
  }

  getItemList(): Observable<Item[]> {
    return this.firestore.collection<Item>(`itemList`).valueChanges();
  }
  
}
