import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { AuthenticationService } from '../../services/authentication/authentication.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.page.html',
  styleUrls: ['./password.page.scss'],
})
export class PasswordPage implements OnInit {
  // Variable para el formulario de password
  passwordForm: FormGroup;
  // Variable para el formulario de password
  constructor(
              private nativeModal: ModalController,
              private formBuilder: FormBuilder,
              private authService: AuthenticationService
              ) { }

  ngOnInit() {
    // Inicializando formulario
    this.passwordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
    // Inicializando formulario
  }
  // Funcion para recuperar la contraseña del usuario
  recoverPasssword() {
    const authData = {
      email: this.passwordForm.value.email,
    };
    this.authService.recoverPassword(authData).then((returnedData) => {
      if (returnedData.status === 'success') {
        const successObject = {
          status: 'success'
        };
        this.nativeModal.dismiss(successObject);
      } else {
        const errorObject = {
          status: 'error'
        };
        this.nativeModal.dismiss(errorObject);
      }
    });
  }
  // Funcion para recuperar la contraseña del usuario
  // Funcion para cerrar el modal
  closeModal() {
    this.nativeModal.dismiss();
  }
  // Funcion para cerrar el modal
}
