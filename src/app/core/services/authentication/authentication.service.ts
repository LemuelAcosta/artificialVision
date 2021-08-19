import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
              private userAuth: AngularFireAuth,
              private realtimeDatabase: AngularFireDatabase
              ) { }
  // Creando un nuevo usuario en el sistema
  async createUser(registerData): Promise<any> {
    return await this.userAuth.createUserWithEmailAndPassword(registerData.email, registerData.password).then((returnedData) => {
      // Actualizando objeto del usuario
      this.userAuth.onAuthStateChanged((userData) => {
        userData.updateProfile({
          displayName: registerData.name,
        });
      });
      const userId = returnedData.user.uid;
      this.realtimeDatabase.database.ref('faceAI/users/' + userId + '/').set({
        name: registerData.name,
        email: registerData.email,
        uid: userId,
        type: 'singleUser',
        isDisabled: false,
        registerComplete: true,
        timeStamp: Date.now(),
      });
      return {status: 'success', data: returnedData.user};
      // Actualizando objeto del usuario
    }).catch((error) => ({status: 'error', data: error}));
  }
  // Creando un nuevo usuario en el sistema
  // Iniciando la sesion de un usuario en el sistema
  async loginUser(authData): Promise<any> {
    return await this.userAuth.signInWithEmailAndPassword(authData.email, authData.password).then((returnedData) => (
      {status: 'success', data: returnedData.user}
    )).catch((error) => ({status: 'error', data: error}));
  }
  // Iniciando la sesion de un usuario en el sistema
  // Recuperando la cuenta de un usuario
  async recoverPassword(authData): Promise<any> {
    return await this.userAuth.sendPasswordResetEmail(authData.email).then((returnedData) => (
      {data: returnedData, status: 'success'}
    )).catch((error) => (
      {data: error, status: 'error'}
    ));
  }
  // Recuperando la cuenta de un usuario
}
