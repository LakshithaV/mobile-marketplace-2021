import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import { FirestoreService } from '../services/data/firestore.service';
import { AuthService } from '../services/authentication.service';

@Component({
  selector: 'app-my-listings-add',
  templateUrl: './my-listings-add.page.html',
  styleUrls: ['./my-listings-add.page.scss'],
})
export class MyListingsAddPage implements OnInit {

  public createItemForm: FormGroup;
  user;
  constructor(
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    private firestoreService: FirestoreService,
    formBuilder: FormBuilder,
    private router: Router,
    private auth: AuthService,
  ) { 
    this.createItemForm = formBuilder.group({
      itemName: ['', Validators.required],
      itemPrice: ['', Validators.required],
      itemDescription: ['', Validators.required],
      itemCategory: ['', Validators.required],
      image: ['', Validators.required],
      itemStock: ['', Validators.required],
    });

    this.auth.getUser().subscribe(user => {
      this.user = user;
    });
  }

  async createItem() {
    const loading = await this.loadingCtrl.create();
  
    const userId = this.user.uid;
    const itemName = this.createItemForm.value.itemName;
    const itemPrice = this.createItemForm.value.itemPrice;
    const itemDescription = this.createItemForm.value.itemDescription;
    const itemCategory = this.createItemForm.value.itemCategory;
    const image = this.createItemForm.value.image;
    const itemStock = this.createItemForm.value.itemStock;
  
    this.firestoreService
      .createItem(userId, itemName, itemPrice, itemDescription, itemCategory,image, itemStock)
      .then(
        () => {
          loading.dismiss().then(() => {
            this.router.navigateByUrl('');
          });
        },
        error => {
          loading.dismiss().then(() => {
            console.error(error);
          });
        }
      );
  
    return await loading.present();
  }

  ngOnInit() {
  }

}
