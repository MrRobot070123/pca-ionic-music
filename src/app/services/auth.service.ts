import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private storageService : StorageService) { }

  loginUser(credentials: any){
    return new Promise ((accept, reject) =>{
      if(
        credentials.email == 'correoprueba@gmail.com' &&
        credentials.password == '12345678'
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
