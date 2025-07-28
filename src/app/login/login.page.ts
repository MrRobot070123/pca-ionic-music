import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { AlertController } from '@ionic/angular/standalone';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IonicModule]
})
export class LoginPage implements OnInit {
  confirmacion = false;
  loginForm: FormGroup;
  errorMessage: String = "";
  user: number = 0;

  validation_messages = {
    email: [
      {
        type: "required", message: "El email es obligatorio"
      },
      {
        type: "email", message: "Email invalido"
      }
    ],
    password: [
      {
        type: "required", message: "Digita tu contraseña"
      },
      {
        type: "minlength", message: "La contraseña debe tener por lo menos 6 caractéres"
      }
    ]
  }

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private navCtrl: NavController,
    private alertController: AlertController,
    private storageService : StorageService
  ) {
    this.loginForm = this.formBuilder.group({
      email: new FormControl(
        '',
        Validators.compose([
          Validators.required, //Campo obligatorio
          Validators.email //Valida el correo electronico
        ])
      ),
      password: new FormControl(
        '',
        Validators.compose([
          Validators.required, //Campo obligatorio
          Validators.minLength(6)
        ])
      )
    })
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.loginForm.reset();
  }

  loginUser(credentials: any) {
    console.log(credentials);
    this.authService.login(credentials).then(response => {
        if (response.status === "OK") {
          const data = (response as { status: "OK"; data: any }).data;
          this.presentAlert(true, "Bienvenido " + data.user.name);
          this.user = data.user.id
          this.redirigirHome()
      } else {
        this.presentAlert(false, response.msg);
      }
    }).catch(error => {
      console.log(error)
    })

  }

  async presentAlert(confirmacion: boolean, mensaje: string = '') {
    const confirma = await this.alertController.create({
      header: confirmacion ? 'Login Correcto' : 'Error de inicio de sesión',
      message: mensaje || (confirmacion ? '¡Usuario ingresó exitosamente!' : '¡Credenciales incorrectas!'),
      buttons: ['Ok'],
    });
    await confirma.present();
  }
  
  redirigirRegister() {
    this.navCtrl.navigateForward('/register');
  }

  async redirigirHome() {
    await this.storageService.set('login', true);
    await this.storageService.set('user',this.user);
    this.navCtrl.navigateForward('/home');
  }
}
