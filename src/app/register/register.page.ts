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
  async presentAlert(confirmacion: boolean, mensaje: string = '') {
    const confirma = await this.alertController.create({
      header: confirmacion ? 'Registro Correcto' : 'Error de registro de sesión',
      message: mensaje  || (confirmacion ? '¡Usuario ingresó exitosamente!' : '¡Credenciales incorrectas!'),
      buttons: ['Ok'],
    });
    await confirma.present();
  }

  ngOnInit() { }


  //Validar y registrar usuarios
  async registerUser(credentials: any) {
    console.log(credentials);
    this.registerService.register(credentials).then(response => {
        if (response.status === "OK") {
          const data = (response as { status: "OK"; data: any }).data;
          this.presentAlert(true, "Hola " + data.user.name + " te registraste con éxito");
          this.redirigirLogin()
      } else {
        this.presentAlert(false, response.msg);
      }
    }).catch(error => {
      console.log(error)
    })
  }

  redirigirLogin(){
    this.navCtrl.navigateForward("/login");
  }
}
