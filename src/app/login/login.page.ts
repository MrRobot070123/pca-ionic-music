import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { AlertController } from '@ionic/angular/standalone';

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
    this.loginForm.setValue
  }

  //Metodo para mostrar mensaje de login
  async presentAlert(confirmacion: boolean) {
    const confirma = await this.alertController.create({
      header: '¡Login Correcto!',
      message: 'Usuario ingresó exitosamente',
      buttons: ['Ok'],
    });
    const declinacion = await this.alertController.create({
      header: '¡Credenciales incorrectas!',
      message: 'Por favor valide las credenciales y vuelva a intentarlo',
      buttons: ['Ok'],
    });
    if (confirmacion) {
      await confirma.present();
      this.navCtrl.navigateForward("/home");
    } else {
      await declinacion.present();
    }
  }

  loginUser(credentials: any) {
    console.log(credentials);
    this.authService.loginUserAuth(credentials).then(respuesta => {
      this.presentAlert(this.confirmacion = true);
      this.errorMessage = "";
    }).catch(error => {
      this.errorMessage = error;
      this.presentAlert(this.confirmacion);
    })
  }
  redirigirRegister() {
    this.navCtrl.navigateForward('/register');
  }
}
