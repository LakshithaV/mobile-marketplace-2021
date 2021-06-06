import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { merge, Observable } from 'rxjs';
import { AuthService } from '../services/authentication.service';

export interface imageData{
  fileName: string;
  filePath: string;
  size: string;
}

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.page.html',
  styleUrls: ['./profile-edit.page.scss'],
})
export class ProfileEditPage implements OnInit {
  userId: string;
  name: string;
  phone: string;
  password: string;
  fileName: string;
  fileSize: string;
  isLoading: boolean;
  isLoaded: boolean;
  percentage: Observable<any>;
  private imageCollection: AngularFirestoreCollection<imageData>;
  imagefile: Observable<imageData[]>;
  imageUpload: AngularFireUploadTask;

  constructor(
    private auth: AuthService,
    private afs: AngularFirestore,
    private loadingCtrl: LoadingController,
    private toaster: ToastController,
    private router: Router,
    private loading: LoadingController,
    private strg: AngularFireStorage,
  ) 
  { 
    this.isLoading = false;
    this.isLoaded = false;
  }

  ngOnInit() {
    this.auth.user$.subscribe(user => {
      this.userId = user.userId;
      this.name = user.userName;
      this.phone = user.userPhone
    })
  }

  async updateProfile(){
    const loading = await this.loadingCtrl.create({
      message: "Updateing...",
      spinner: 'crescent',
      showBackdrop: true
    });

    loading.present();

    this.afs.collection('user').doc(this.userId).set({
      'userName': this.name,
      'userPhone': this.phone,
      'editAt': Date.now()
    },{merge: true})
    .then(()=> {
      loading.dismiss();
      this.toast('Update Success!', 'sucess');
      this.router.navigate(['/tabs/profile']);
    })
    .catch(error => {
      loading.dismiss();
      this.toast(error.message, 'danger');
    })
  }

  async toast(message,status){
    const toast = await this.toaster.create({
      message: message,
      color: status,
      position: 'top',
      duration: 2000
    });

    toast.present();
  }


  async uploadImagetoFirebase(event){

    const load = await this.loading.create({
      spinner: 'dots',
    })
    load.present();

    const file = event.target.files;
    console.log(file);
    var fileName = file[0];
    console.log(fileName);

    if(fileName.type.split('/')[0] !=="image"){
      console.error("File is not an Image");
      return;
    }

    this.isLoaded = false;
    this.isLoading = true;

    const path = `loginUploads/${new Date().getTime()}_${fileName.name}`;

    var fileRef = this.strg.ref(path);

    this.imageUpload = this.strg.upload(path, fileName);
    this.loading.dismiss();
    this.percentage = this.imageUpload.percentageChanges();

    this.imageUpload.then( res=> {
      var imagefile = res.task.snapshot.ref.getDownloadURL();
      imagefile.then( downloadableUrl=> {
        console.log("URL", downloadableUrl);
        this.afs.collection('user').doc(this.userId).set({
          photoUrl: downloadableUrl
        },{merge: true});
      })
    })
  }

}
