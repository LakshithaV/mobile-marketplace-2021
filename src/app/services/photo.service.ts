import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, CameraPhoto } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Storage } from '@capacitor/storage';
import {PermissionState} from '@capacitor/core';
import {ProfilePage} from '../profile/profile.page';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  public photos: Photo[] = [];

  public async addNewToGallery() {
    // Take a photo
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100
    });

    this.photos.unshift({
      filepath: "soon...",
      webviewPath: capturedPhoto.webPath
    });
  }
  

  constructor() { }
}
export interface Photo {
  filepath: string;
  webviewPath: string;
}

