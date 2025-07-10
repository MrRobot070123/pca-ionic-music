import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] //Esto es necesario para utilizar swiper en Ionic
})
export class HomePage {

  genres = [
    {
      title: "Musica Clásica",
      image: "https://venezuelasinfonica.com/wp-content/uploads/2016/01/mclasica.jpg",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, molestiae? Labore earum, repudiandae ex quisquam eius voluptas, nostrum non repellat ea reiciendis placeat exercitationem ipsam, delectus sit accusantium cumque corporis?"
    },
    {
      title: "Música Popular",
      image: "https://c923ad959a.clvaw-cdnwnd.com/94a2f702f9ae92bdf199ed2ce3dcf8fa/200000249-40e7640e78/accordion_black_and_white_entertainment_hands_music_musical_instrument_musician_performance-1150838%20%281%29.jpg?ph=c923ad959a",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, molestiae? Labore earum, repudiandae ex quisquam eius voluptas, nostrum non repellat ea reiciendis placeat exercitationem ipsam, delectus sit accusantium cumque corporis?"
    },
    {
      title: "Música Folclórica",
      image: "https://arpeggium.net/media/images/musica-folclorica.jpg",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, molestiae? Labore earum, repudiandae ex quisquam eius voluptas, nostrum non repellat ea reiciendis placeat exercitationem ipsam, delectus sit accusantium cumque corporis?"
    },
    {
      title: "Música Instrumental",
      image: "https://cubalite.com/wp-content/uploads/2020/08/Musica-instrumental-Motion-Array.jpg",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, molestiae? Labore earum, repudiandae ex quisquam eius voluptas, nostrum non repellat ea reiciendis placeat exercitationem ipsam, delectus sit accusantium cumque corporis?"
    },
    {
      title: "Música Eletrónica",
      image: "https://hacercanciones.com/wp-content/uploads/2023/02/canciones-musica-electronica.jpg",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, molestiae? Labore earum, repudiandae ex quisquam eius voluptas, nostrum non repellat ea reiciendis placeat exercitationem ipsam, delectus sit accusantium cumque corporis?"
    }
  ]

  constructor() {}
}