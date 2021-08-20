import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorage } from '@angular/fire/storage';
import { LoadingController, NavParams, ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { RecognitionService } from 'src/app/core/services/recognition/recognition.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-camera-result',
  templateUrl: './camera-result.page.html',
  styleUrls: ['./camera-result.page.scss'],
})
export class CameraResultPage implements OnInit {
  pictureToShow: string;
  // Variables para monitorear la subida de archivos
  uploadResumePictures: Observable<number>;
  downloadFileURL: Observable<string>;
  // Variables para monitorear la subida de archivos
  showGesture = false;
  gesture: string;
  constructor(
              private navParams: NavParams,
              private nativeLoader: LoadingController,
              private nativeModal: ModalController,
              private recognitionService: RecognitionService,
              private userAuth: AngularFireAuth,
              private fireStorage: AngularFireStorage,
              ) { }

  ngOnInit() {
    // Extrayendo datos de la URL
    this.pictureToShow = this.navParams.get('image');
    // Extrayendo datos de la URL
  }
  startRecognition(): void {
  }
  closeModal(): void {
    this.nativeModal.dismiss();
  }
  public async uploadFile(): Promise<any> {
    const loader = await this.nativeLoader.create({
      message: 'Subiendo copia de la foto'
    });
    loader.present();
    const fileName = Date.now();
    const userID: string = (await this.userAuth.currentUser).uid;
      const filePath = `lengvappPlatform/users/drivers/${userID}/${fileName}`;
      const ref = this.fireStorage.ref(filePath);
      const task = ref.putString(this.pictureToShow, 'data_url');
      task.snapshotChanges().pipe(finalize(() => {
        this.downloadFileURL = ref.getDownloadURL();
        this.downloadFileURL.subscribe(async (url) => {
          this.recognitionService.createRecognition(url, userID, fileName).then(() => {
            loader.message = 'Iniciando reconocimiento de manos';
            this.recognitionService.callRecognition(url).then((result) => {
              console.log('El resultado', result);
              if (result.hands.length === 0) {
                this.nativeModal.dismiss(false);
              } else {
                const listOfValues: any[] = Object.values(result.hands[0].gesture);
                const listOfKeys: any[] = Object.keys(result.hands[0].gesture);
                const maxValue: number = Math.max(...listOfValues);
                console.log('El valor maximo es', maxValue);
                const keyPosition = listOfValues.indexOf(maxValue);
                const keyName = listOfKeys[keyPosition];
                this.recognitionService.updateRecognition(userID, fileName, keyName).then(() => {
                  this.showGesture = true;
                  this.gesture = keyName;
                });
              }
            });
            this.nativeLoader.dismiss();
          });
        });
      })).subscribe();
  }
}
