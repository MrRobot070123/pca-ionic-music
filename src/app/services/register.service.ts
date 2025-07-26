import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular/standalone';
import {NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  urlServer = "https://music.fly.dev";
  response : any

  constructor(
    private alertController : AlertController,
    private navCtrl : NavController
  ) { }

  async register(credenciales: any){
    const body = {
      user: {
        email: credenciales.email,
        password: credenciales.password,
        password_confirmation: credenciales.password,
        name: credenciales.name,
        last_name: credenciales.last_name
      }
    };

    return fetch(`${this.urlServer}/signup`, {
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
            msg: "Registro incorrecto"
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
}
