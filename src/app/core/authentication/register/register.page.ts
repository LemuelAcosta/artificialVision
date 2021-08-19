import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthenticationService } from '../../services/authentication/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
   // Variable para el formulario de registro
  registerForm: FormGroup;
  // Variable para el formulario de registro
  constructor(
              private router: Router,
              private formBuilder: FormBuilder,
              private authService: AuthenticationService,
              private nativeToast: ToastController
              ) { }

  ngOnInit() {
    // Inicializando formularios
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(30)]],
      email: ['', [Validators.required, Validators.email,]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
    // Inicializando formularios
  }
  // Funcion para navegar al login
  goToLogin(): void {
    this.router.navigate(['/login']);
  }
  // Funcion para navegar al login
  // Funcion para registrar a un nuevo usuario en el sistema
  registerUser() {
    // Ejecutando autenticacion desde el servicio
    const authData = {
      name: this.registerForm.value.name,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
    };
    this.authService.createUser(authData).then(async (returnedData: any) => {
      if (returnedData.status === 'success') {
        const successToast = await this.nativeToast.create({
          message: 'Registro exitoso',
          position: 'bottom',
          duration: 700,
          animated: true,
        });
        successToast.present();
        this.router.navigate(['/login'], {replaceUrl: true});
      } else {
        // Ejecutando el performance
        const errorCodes = returnedData.data.code;
        switch (errorCodes) {
          case 'auth/invalid-email':
            const invalidEmailToast = await this.nativeToast.create({
              message: 'Dirección de correo invalida',
              color: 'danger',
              duration: 700,
              buttons: ['Aceptar']
            });
            invalidEmailToast.present();
            break;
            case 'auth/email-already-in-use':
              const emailInUseToast = await this.nativeToast.create({
              message: 'Correo en uso',
              color: 'danger',
              duration: 700,
              buttons: ['Aceptar']
            });
            emailInUseToast.present();
            break;
          case 'auth/operation-not-allowed':
            const operationNotAllowedToast = await this.nativeToast.create({
              message: 'Registro inhabilitado',
              color: 'danger',
              duration: 700,
              buttons: ['Aceptar']
            });
            operationNotAllowedToast.present();
            break;
          case 'auth/weak-password':
            const weakPasswordToast = await this.nativeToast.create({
              message: 'Contraseña débil',
              color: 'danger',
              duration: 700,
              buttons: ['Aceptar']
            });
            weakPasswordToast.present();
            break;
        }
      }
    });
    // Ejecutando autenticacion desde el servicio
  }
}
