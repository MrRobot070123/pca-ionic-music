import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private storageService : StorageService) { }

  async loginUserAuth(credentials: any){
    const usuarioForm = credentials;
    let usuariosBD = await this.storageService.getUsers();
    return new Promise ((accept, reject) =>{
      //Valida si el cuenta (email) ya exite y compara con la contraseña de la base datos vs la contraseña del formulario
      const cuenta = usuariosBD.some(user => user.email === usuarioForm.email);
      const password = usuariosBD.some(user => user.password === usuarioForm.password);
      if(cuenta && password
      ){
        accept('¡Login Correcto!');
        this.goHome();

      }else{
        reject('¡Credenciales Incorrectas!');
      }
    })
  }

  async goHome() {  
    await this.storageService.set('login', true); // marcador de navegación
  }

}
