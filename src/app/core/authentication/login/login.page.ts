import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController, ModalController } from '@ionic/angular';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { PasswordPage } from '../password/password.page';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  // Variable para el formulario de registro
  loginForm: FormGroup;
  // Variable para el formulario de registro
  // Variable para extraer el estatus del usuario
  userStatus: any;
  // Variable para extraer el estatus del usuario
  // Variable para extraer el userId del usuario
  userId: any;
  // Variable para extraer el userId del usuario
  constructor(
              private router: Router,
              private formBuilder: FormBuilder,
              private authService: AuthenticationService,
              private nativeToast: ToastController,
              private nativeModal: ModalController
              ) { }

  ngOnInit() {
    // Inicializando formularios
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email,]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
    // Inicializando formularios
  }
  // Funcion para iniciar la sesion de un usuario
  loginUser() {
    // Extrayendo datos del formulario
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
    // Extrayendo datos del formulario
    // Ejecutando autenticacion desde el servicio
    const authData = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };
    this.authService.loginUser(authData).then(async (returnedData) => {
      if (returnedData.status === 'success') {
        const name = returnedData.data.displayName;
        const successToast = await this.nativeToast.create({
          message: 'Hey, que tal ' + name,
          position: 'bottom',
          cssClass: 'successToast',
          duration: 700,
          animated: true,
        });
        successToast.present();
        this.router.navigate(['/recognition'], {replaceUrl: true});
      } else {
        const errorCodes = returnedData.data.code;
        switch (errorCodes) {
          case 'auth/invalid-email':
            const invalidToast = await this.nativeToast.create({
              message: 'La direccón de correo introducida es invalida',
              buttons: ['Aceptar'],
              duration: 700,
              color: 'danger'
            });
            invalidToast.present();
            break;
          case 'auth/user-disabled':
            const disabledToast = await this.nativeToast.create({
              message: 'Estimado usuario, la cuenta vinculada a la dirección de correo introducida ha sido inhabilitada',
              buttons: ['Aceptar'],
              duration: 700,
              color: 'danger'
            });
            disabledToast.present();
            break;
          case 'auth/user-not-found':
            const notUserToast = await this.nativeToast.create({
              message: 'Datos erróneos',
              buttons: ['Aceptar'],
              duration: 700,
              color: 'danger'
            });
            notUserToast.present();
            break;
          case 'auth/wrong-password':
            const errorToast = await this.nativeToast.create({
              message: 'Datos erróneos',
              buttons: ['Aceptar'],
              duration: 700,
              color: 'danger'
            });
            errorToast.present();
            break;
        }
      }
    });
    // Ejecutando autenticacion desde el servicio
  }
  // Funcion para iniciar la sesion de un usuario
  // Funcion para ir a la ventana de registro
  goToRegister() {
    this.router.navigate(['/register']);
  }
  // Funcion para ir a la ventana de registro
  // Funcion para mostrar el modal de recuperacion de contraseñas
  async showModal() {
    const passwordModal = await this.nativeModal.create({
      component: PasswordPage,
      animated: true,
      swipeToClose: true,
      showBackdrop: true,
      cssClass: 'passwordModal'
    });
    passwordModal.present();
    await passwordModal.onWillDismiss().then(async (returnedData) => {
      if (returnedData.data !== null || returnedData.data !== undefined){
        switch(returnedData.data.status) {
          case 'success':
            const successToast = await this.nativeToast.create({
              message: 'Enlace enviado exitosamente',
              position: 'bottom',
              cssClass: 'successToast',
              duration: 900,
              animated: true,
            });
            successToast.present();
            break;
          case 'error':
            const errorToast = await this.nativeToast.create({
              message: 'Ocurrio un problema durante el envio',
              buttons: ['Aceptar'],
              color: 'danger'
            });
            errorToast.present();
            break;
        }
      }
    });
  }
  // Funcion para mostrar el modal de recuperacion de contraseñas
}
