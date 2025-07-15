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
import { Title } from '@angular/platform-browser';

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
      title: 'App de Música',
      image: 'assets/img/musica.png',
    },
    {
      title: 'Disfruta de tus géneros favoritos',
      image: 'assets/img/generos.png',
    },
    {
      title: 'Enlista tus canciones preferidas',
      image: 'assets/img/canciones.png',
    },
    {
      title: 'Personaliza tu experiencia',
      image: 'assets/img/personaliza.png',
    }
  ];

  constructor(private storageService: StorageService, private router: Router) {}

  async goHome() {  
    await this.storageService.set('fromIntro', true); // marcador de navegación
    this.router.navigateByUrl('/home');
  }
}
