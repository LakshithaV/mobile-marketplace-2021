import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/authentication.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  user: any;

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.auth.user$.subscribe(user => {
      this.user = user;
    })
  }

  editProfile(){
    this.router.navigate(['/profile/edit']);
  }

  logout(){
    this.auth.signOut();
  }

  addItem(){
    this.router.navigate(['/my-listings-add'])
  }

}
