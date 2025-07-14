import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from '@ionic/angular/standalone';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], //Esto es necesario para utilizar swiper en Ionic
})
export class HomePage implements OnInit {
  colorClaro = 'var(--color-claro)';
  colorOscuro = 'var(--color-oscuro)';
  colorActual = this.colorOscuro;
  sliderClaro = 'var(--slider-claro)';
  sliderOscuro = 'var(--slider-oscuro)';
  sliderColorActual = this.sliderClaro;
  sliderTexto = 'var(--slider-texto-oscuro)';

  genres = [
    {
      title: 'Musica Clásica',
      image:
        'https://cdn.pixabay.com/photo/2014/11/07/20/34/cello-521172_1280.jpg',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, molestiae? Labore earum, repudiandae ex quisquam eius voluptas, nostrum non repellat ea reiciendis placeat exercitationem ipsam, delectus sit accusantium cumque corporis?',
    },
    {
      title: 'Música Popular',
      image: 'https://cdn.pixabay.com/photo/2017/11/12/16/41/musician-2943109_1280.jpg',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, molestiae? Labore earum, repudiandae ex quisquam eius voluptas, nostrum non repellat ea reiciendis placeat exercitationem ipsam, delectus sit accusantium cumque corporis?',
    },
    {
      title: 'Música Folclórica',
      image: 'https://cdn.pixabay.com/photo/2020/03/09/04/34/folklore-4914425_1280.jpg',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, molestiae? Labore earum, repudiandae ex quisquam eius voluptas, nostrum non repellat ea reiciendis placeat exercitationem ipsam, delectus sit accusantium cumque corporis?',
    },
    {
      title: 'Música Instrumental',
      image:
        'https://cdn.pixabay.com/photo/2022/05/24/19/28/cello-7219171_1280.jpg',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, molestiae? Labore earum, repudiandae ex quisquam eius voluptas, nostrum non repellat ea reiciendis placeat exercitationem ipsam, delectus sit accusantium cumque corporis?',
    },
    {
      title: 'Música Eletrónica',
      image:
        'https://cdn.pixabay.com/photo/2022/07/04/04/37/musician-7300353_1280.jpg',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, molestiae? Labore earum, repudiandae ex quisquam eius voluptas, nostrum non repellat ea reiciendis placeat exercitationem ipsam, delectus sit accusantium cumque corporis?',
    },
  ];

  constructor(private storageService: StorageService, private router: Router) {}

  async ngOnInit() {
    await this.loadStoargeData();
    this.simularCarga();
  }

  async ionViewWillEnter() {
    //llamado cuando la vista está a punto de entrar
    const fromIntro = await this.storageService.get('fromIntro');

    if (fromIntro) {
      console.log('Ya vi la pagina de intro');
        await this.storageService.remove('fromIntro');
    }
  }

  async cambiarColor() {
    //If ternario para cambiar el color
    this.colorActual =
      this.colorActual === this.colorClaro ? this.colorOscuro : this.colorClaro;
    await this.storageService.set('theme', this.colorActual);
    console.log('Tema camabiado a:', this.colorActual);
  }

  cambiarSliderColor() {
    this.sliderColorActual =
      this.sliderColorActual === this.sliderClaro
        ? this.sliderOscuro
        : this.sliderClaro;
    this.sliderTexto =
      this.sliderColorActual === this.sliderClaro
        ? 'var(--slider-texto-oscuro)'
        : 'var(--slider-texto-claro)';
  }

  async loadStoargeData() {
    const savedTheme = await this.storageService.get('theme');
    if (savedTheme) {
      this.colorActual = savedTheme;
      console.log('Tema cargado desde el storage:', this.colorActual);
    }
  }

  async simularCarga(){
    const data = await this.obtenerData();
    console.log('Datos obtenidos:', data);
  }

  obtenerData(){
    return new Promise ((resolve, reject) => {
      try {
        setTimeout(()=>{
          resolve(['Pop','Jazz','Rock','Hip-Hop','Reggae']);
        },3000);
      } catch (error) {
        reject('Error al obtener los datos');
      }
    })
  }

  goBack() {
    console.log('Volver a la página anterior');
    this.router.navigateByUrl('/intro');
  }
}
