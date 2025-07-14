import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { StorageService } from '../services/storage.service';

@Injectable({
  providedIn: 'root'
})

export class IntroGuard implements CanActivate {

  constructor(private storageService: StorageService, private router: Router) {}  
  
  async canActivate(): Promise<boolean> {
    const fromIntro = await this.storageService.get('fromIntro');
    if (fromIntro){
      return true; // Permitir el acceso si ya se ha visto la introduccion
    }else{
      console.log('No he visto la Página de Intro - redirigiendo a Intro');
      this.router.navigateByUrl('/intro'); // Redirigir a la pagina de introduccion si no se ha visto
      return false;
    }
  }
}