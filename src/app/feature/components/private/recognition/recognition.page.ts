import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ToastController, ModalController } from '@ionic/angular';
import { CameraResultPage } from '../camera-result/camera-result.page';
import { RecognitionService } from '../../../../core/services/recognition/recognition.service';

@Component({
  selector: 'app-recognition',
  templateUrl: './recognition.page.html',
  styleUrls: ['./recognition.page.scss'],
})
export class RecognitionPage implements OnInit {
  // Objeto de configuracion para la camara
  cameraOptions: CameraOptions = {
    quality: 100,
    destinationType: this.nativeCamera.DestinationType.DATA_URL,
    encodingType: this.nativeCamera.EncodingType.JPEG,
    mediaType: this.nativeCamera.MediaType.PICTURE,
    targetHeight: 500,
    targetWidth: 500,
    correctOrientation: true,
  };
  // Objeto de configuracion para la camara
  recognitions: any[] = [];
  constructor(
              private nativeCamera: Camera,
              private androidPermissions: AndroidPermissions,
              private nativeToast: ToastController,
              private nativeModal: ModalController,
              private userAuth: AngularFireAuth,
              private recognitionService: RecognitionService
              ) { }

  ngOnInit() {
    this.getUserId().then((result) => {
      this.recognitionService.getRecognitions(result).subscribe((data) => {
        this.recognitions = data;
      });
    });
  }
  async getUserId(): Promise<any> {
    return (await this.userAuth.currentUser).uid;
  }
  // Funcion para abrir la camara y tomar fotos
  takePicture(): void {
    this.nativeCamera.getPicture(this.cameraOptions).then(async (imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      const base64Image: string = 'data:image/jpg;base64,' + imageData;
      const successToast = await this.nativeToast.create({
        message: 'Foto tomada exitosamente',
        duration: 1000,
        color: 'primary',
        buttons: ['Aceptar']
      });
      successToast.present();
      successToast.onWillDismiss().then(async () => {
        const resultModal = await this.nativeModal.create({
          component: CameraResultPage,
          animated: true,
          swipeToClose: true,
          showBackdrop: true,
          cssClass: 'resultModal',
          componentProps: {
            image: base64Image
          }
        });
        resultModal.present();
        resultModal.onWillDismiss().then(async (response) => {
          if (response.data === true) {
            const readyToast = await this.nativeToast.create({
              message: 'Reconocimiento de gestos exitoso',
              duration: 1000,
              buttons: ['Aceptar']
            });
            readyToast.present();
          } else {
            const erroToast = await this.nativeToast.create({
              message: 'Esta foto no contiene manos',
              duration: 1000,
              color: 'danger',
              buttons: ['Aceptar']
            });
            erroToast.present();
          }
        });
      });
    }, async (err) => {
      const erroToast = await this.nativeToast.create({
        message: 'Ocurrió un error con la cámara',
        duration: 1000,
        color: 'danger',
        buttons: ['Aceptar']
      });
      erroToast.present();
    });
  }
  // Funcion para abrir la camara y tomar fotos
}
