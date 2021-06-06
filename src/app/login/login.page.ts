import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AuthService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string;
  password: string;

  constructor(
    private auth: AuthService,
    private toaster: ToastController
  ) { }

  ngOnInit() {
  }

  login(){
    if(this.email && this.password){
      this.auth.signIn(this.email, this.password);
    } else {
      this.toast('Please enter your email & password!', 'warning');
    }
  }

  async toast(message, status){
    const toast = await this.toaster.create({
      message: message,
      color: status,
      position: 'top',
      duration: 2000
    });
    toast.present();
  }
  

}
