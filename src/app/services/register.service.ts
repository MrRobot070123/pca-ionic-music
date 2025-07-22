import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private storageService : StorageService) { }

  async serviceRegisterUser(credentials: any){
    const nuevoUsuario = credentials;
    let usuarios = await this.storageService.getUsers();
    return new Promise ((accept,reject) =>{
    //Valida si el email ya exite
    const existe = usuarios.some(user => user.email === nuevoUsuario.email);
    if (!existe) {
      //Guarda usuario
      usuarios.push(nuevoUsuario);
      this.storageService.setUsers(usuarios);
      accept('¡Registro exitoso!');
    } else {
      reject('El correo ya está registrado');
    }
    })
  }
}
