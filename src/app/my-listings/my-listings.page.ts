import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirestoreService } from '../services/data/firestore.service';
import { AuthService } from '../services/authentication.service';

@Component({
  selector: 'app-my-listings',
  templateUrl: './my-listings.page.html',
  styleUrls: ['./my-listings.page.scss'],
})
export class MyListingsPage implements OnInit {

  user;
  data;

  constructor(
    private router: Router,
    private fs: FirestoreService,
    private auth: AuthService

  ) { 
    this.auth.getUser().subscribe(user => {
      this.user = user;

      this.fs.getUserListing(this.user.uid).subscribe( res => {
        this.data = res;
      })
    })
  }

  ngOnInit() {
  }

  addItem(){
    this.router.navigate(['/my-listings-add'])
  }


}
