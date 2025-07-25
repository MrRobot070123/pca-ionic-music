import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular/standalone';
import { MusicService } from './music.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  urlServer = "https://music.fly.dev";
  confirmacion = false;
  response: any;

  constructor(
    private storageService: StorageService,
    private alertController: AlertController,
    private navCtrl: NavController,
    private musicService: MusicService
  ) { }

  async presentAlert(confirmacion: boolean, mensaje: string = '') {
    const confirma = await this.alertController.create({
      header: confirmacion ? 'Login Correcto' : 'Error de inicio de sesión',
      message: mensaje  || (confirmacion ? '¡Usuario ingresó exitosamente!' : '¡Credenciales incorrectas!'),
      buttons: ['Ok'],
    });
    await confirma.present();
  }

  async loginUserAuth(credentials: any) {
    this.response = await this.login(credentials);

    if (this.response.status === "OK") {
      this.presentAlert(true, "Bienvenido " + this.response.user.name);
      this.goHome();
    } else {
      this.presentAlert(false, this.response.msg);
    }
  }

  userId(){
    return this.response.user.id;
  }


  async goHome() {
    await this.storageService.set('login', true); // marcador de navegación
    this.navCtrl.navigateForward('/home');
  }

  async login(credenciales: any) {
    const body = {
      user: {
        email: credenciales.email,
        password: credenciales.password
      }
    };

    try {
      const response = await fetch(`${this.urlServer}/login`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body) // 👈 FORMATO EXACTO
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Error HTTP:", response.status, data);
        return { status: "ERROR", msg: data.msg || "Credenciales inválidas" };
      }

      return data; // Esto tendrá el "msg", "user", y "status"
    } catch (error) {
      console.error("Error de red o fetch:", error);
      return { status: "ERROR", msg: "No se pudo conectar al servidor" };
    }
  }
}
