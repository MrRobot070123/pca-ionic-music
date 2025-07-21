import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { StorageService } from '../services/storage.service';

@Injectable({
  providedIn: 'root'
})

export class loginGuard implements CanActivate {

  constructor(private storageService: StorageService, private router: Router) {}  
  
  async canActivate(): Promise<boolean> {
    const fromLogin = await this.storageService.get('login');
    if (fromLogin){
      return true; // Permitir el acceso si ya se ha logueado
    }else{
      console.log('No está logueado, por favor inicie sesion');
      this.router.navigateByUrl('/login'); // Redirigir a la pagina de login
      return false;
    }
  }
}