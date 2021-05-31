import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Item } from '../models/item.interface';
import { FirestoreService } from '../services/data/firestore.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  public item: Item;
  constructor(
    private firestoreService: FirestoreService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    const itemId: string = this.route.snapshot.paramMap.get('id');
    this.firestoreService.getItemDetail(itemId).subscribe(item => {
      this.item = item;
    });
  }

}
