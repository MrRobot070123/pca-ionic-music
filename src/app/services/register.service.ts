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

  async presentAlert(confirmacion: boolean, mensaje: string = '') {
    const confirma = await this.alertController.create({
      header: confirmacion ? 'Registro Correcto' : 'Error de registro de sesión',
      message: mensaje  || (confirmacion ? '¡Usuario ingresó exitosamente!' : '¡Credenciales incorrectas!'),
      buttons: ['Ok'],
    });
    await confirma.present();
  }

  async serviceRegisterUser(credentials: any){
    this.response = await this.serviceRegister(credentials);
    if (this.response.status === "OK") {
      this.presentAlert(true, "¡Te has registrado existosamente!")
      this.navCtrl.navigateForward("/login");
    } else {
      this.presentAlert(false, this.response.msg)
    }
  }

  async serviceRegister(credentials : any){
    const body = {
      user: {
        email: credentials.email,
        password: credentials.password,
        password_confirmation: credentials.password,
        name: credentials.name,
        last_name: credentials.last_name
      }
    };

    try {
      const response = await fetch(`${this.urlServer}/signup`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Error HTTP:", response.status, data);
        return { status: "ERROR", msg: data.msg || "Error de creación" };
      }
      return data; 

    } catch (error) {
      console.error("Error de red o fetch:", error);
      return { status: "ERROR", msg: "No se pudo conectar al servidor" };
    }
  }
}
