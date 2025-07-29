import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
} from '@ionic/angular/standalone';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonButton,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], //Esto es necesario para utilizar swiper en Ionic
})

export class IntroPage {

  intros = [
    {
      image: 'assets/img/musica.gif',
      description: '¡Bienvenido a tu app favorita!'
    },
    {
      image: 'assets/img/generos.gif',
      description: 'Disfruta de tus géneros favoritos sin límites.'
    },
    {
      image: 'assets/img/canciones.gif',
      description: 'Enlista tus canciones preferidas y llévalas contigo donde vayas.'
    },
    {
      image: 'assets/img/personaliza.gif',
      description: 'Lleva a otro nivel tu experiencia musical con tu propio estilo'
    }
  ];

  constructor(private storageService: StorageService, private router: Router) {}

  async ngOnInit() {
    const body = document.body;
    body.classList.add('dark-theme-const');
  }

  ionViewDidLeave() {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur(); // Desenfoca el elemento activo actual
    }
  }

  ngOnDestroy() {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  }
  
  async goHome() {  
    const login = await this.storageService.get('login');
    const usuario = await this.storageService.get('user');
    if(login && usuario != 0){
      await this.storageService.set('fromIntro', true); // marcador de navegación
      this.router.navigateByUrl('/home');
    }else{
      console.log("Ingresa credenciales primero");
      this.router.navigateByUrl('/login');
    }
  }
}
