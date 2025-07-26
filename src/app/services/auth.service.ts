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


  /*async loginUserAuth(credentials: any) {
    this.response = await this.login(credentials);

    if (this.response.status === "OK") {
      this.presentAlert(true, "Bienvenido " + this.response.user.name);
      this.goHome();
    } else {
      this.presentAlert(false, this.response.msg);
    }
  }*/

  login(credenciales: any) {
    const body = {
      user: {
        email: credenciales.email,
        password: credenciales.password
      }
    };

    return fetch(`${this.urlServer}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })
      .then(async response => {
        const responseBody = await response.json().catch(() => null);
        if (!response.ok) {         
          return {
            status: "ERROR",
            code: response.status,
            msg: "Credenciales incorrectas"
          };
        }

        return {
          status: "OK",
          data: responseBody
        };
      })
      .catch(error => {
        console.log(error, "error authservice")
        return {
          status: "ERROR",
          msg: "No se pudo conectar al servidor"
        };
      });
  }

  userId() {
    return this.response.user.id;
  }


  async goHome() {
    await this.storageService.set('login', true); // marcador de navegación
    this.navCtrl.navigateForward('/home');
  }

}
