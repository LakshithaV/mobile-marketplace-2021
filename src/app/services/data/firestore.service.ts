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
    userId: string,
    itemName: string,
    itemPrice: number,
    itemDescription: string,
    itemCategory: string,
    image: string,
    itemStock: number
  ): Promise<void>{
    const id = this.firestore.createId();

    return this.firestore.doc(`itemList/${id}`).set({
      id,
      userId,
      itemName,
      itemPrice,
      itemDescription,
      itemCategory,
      image,
      itemStock,
    })
  }

  getItemList(): Observable<Item[]> {
    return this.firestore.collection<Item>(`itemList`).valueChanges();
  }
  
  getItemDetail(itemId: string): Observable<Item> {
    return this.firestore.collection('itemList').doc<Item>(itemId).valueChanges();
  }

  getUserListing(userId){
    return this.firestore.collection<Item>(`itemList`, ref => ref.where('userId', '==', userId)).valueChanges();
  }
  
}
