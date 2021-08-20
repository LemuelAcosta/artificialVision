/* eslint-disable arrow-body-style */
/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireAuth } from '@angular/fire/auth';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecognitionService {

  constructor(
              private fireStorage: AngularFireStorage,
              private realtimeDatabase: AngularFireDatabase,
              private userAuth: AngularFireAuth,
              private httpClient: HttpClient
              ) { }
  public async createRecognition(url: string, uid: string, code: number): Promise<any> {
    return await this.realtimeDatabase.database.ref(`faceAI/users/${uid}/recognitions/${code}/`).set({
      timeStamp: code,
      picture: url,
      user: uid
    }).then((data) => ({info: data}));
  }
  public async callRecognition(url: string): Promise<any> {
    const dataToSend = new FormData();
    dataToSend.append('api_key', 'Ztvn5WnDKY7FkRn6a2KIoyZiqhBALKoI');
    dataToSend.append('api_secret', 'TO3QC7DK6jtyeLThTiObs97142mOR7XI');
    dataToSend.append('image_url', url);
    dataToSend.append('return_gesture', '1');
    const urlToApi = 'https://api-us.faceplusplus.com/humanbodypp/v1/gesture';
    return await this.httpClient.post(urlToApi, dataToSend).toPromise().then((response) => {
      return response;
    });
  }

  public async updateRecognition(uid, code, keyName): Promise<any> {
    return await this.realtimeDatabase.database.ref(`faceAI/users/${uid}/recognitions/${code}/`).update({
      status: 'success',
      gesture: keyName
    }).then((response) => {
      return {data: response};
    });
  }

  public getRecognitions(uid): Observable<any> {
    return this.realtimeDatabase.list(`faceAI/users/${uid}/recognitions/`).valueChanges();
  }
}
