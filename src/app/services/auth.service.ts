import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  urlServer = "https://music.fly.dev";
  responseBody: any;

  constructor(
    private storageService: StorageService,
    private navCtrl: NavController,
  ) { }

  async login(credenciales: any) {
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
        this.responseBody = await response.json().catch(() => null);
        if (!response.ok) {         
          return {
            status: "ERROR",
            code: response.status,
            msg: "Credenciales incorrectas"
          };

        }

        return {
          status: "OK",
          data: this.responseBody
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
    return this.responseBody.user.id;
  }

  async goHome() {
    await this.storageService.set('login', true); // marcador de navegación
    this.navCtrl.navigateForward('/home');
  }

}
