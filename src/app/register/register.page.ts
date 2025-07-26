import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
  FormControl,
} from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular/standalone';
import { RegisterService } from '../services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IonicModule]
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;
  errorMessage: String = '';
  confirmacion= false;

  validation_messages = {
    name: [
      {
        type: 'required',
      },
      {
        type: 'name',
        message: 'El nombre es obligatorio',
      },
    ],
    last_name: [
      {
        type: 'required',
      },
      {
        type: 'name',
        message: 'El apellido es obligatorio',
      },
    ],
    email: [
      {
        type: 'required',
        message: 'El email es obligatorio',
      },
      {
        type: 'email',
        message: 'Email invalido',
      },
    ],
    password: [
      {
        type: 'required',
        message: 'Digita tu contraseña',
      },
      {
        type: 'minlength',
        message: 'La contraseña debe tener por lo menos 8 caractéres',
      },
    ],
  };

  constructor(
    private formBuilder: FormBuilder, 
    private alertController: AlertController, 
    private registerService : RegisterService,
    private navCtrl: NavController
  ) {
    this.registerForm = this.formBuilder.group({
      name: new FormControl(
        '',
        Validators.compose([
          Validators.required, //Campo obligatorio
          //this.nameWithSurnameValidator(),
        ])
      ),
      last_name: new FormControl(
        '',
        Validators.compose([
          Validators.required, //Campo obligatorio
        ])
      ),
      email: new FormControl(
        '',
        Validators.compose([
          Validators.required, //Campo obligatorio
          Validators.email, //Valida el correo electronico
        ])
      ),
      password: new FormControl(
        '',
        Validators.compose([
          Validators.required, //Campo obligatorio
          Validators.minLength(8),
        ])
      ),
    });
  }

  //Metodo para mostrar mensaje de registro
  async presentAlert(confirmacion: boolean) {
    const confirma = await this.alertController.create({
      header: 'Usuario creado',
      message: '¡Su usuario fue creado exitosamente!',
      buttons: ['Ok'],
    });
    const declinacion = await this.alertController.create({
      header: 'Usuario no creado',
      message: '¡La cuenta ya existe en el sistema!',
      buttons: ['Ok'],
    });
    if (confirmacion) {
      await confirma.present();

    } else {
      await declinacion.present();
    }
  }

  ngOnInit() { }


  //Validar y registrar usuarios
  async registerUser(credentials: any) {
    console.log(credentials);
    this.registerService.serviceRegisterUser(credentials)
  }

  redirigirLogin(){
    this.navCtrl.navigateForward("/login");
  }
}
