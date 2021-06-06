import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from '../models/item.interface';
import { FirestoreService } from '../services/data/firestore.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  public itemList: Observable<Item[]>;
  filterTerm: string;
  constructor(
    private firestoreService : FirestoreService
  ) { }
    
  ngOnInit() {
    this.itemList = this.firestoreService.getItemList();
  }

}
