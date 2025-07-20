import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  IonCard, 
  IonCardContent, 
  IonCardHeader, 
  IonCardSubtitle, 
  IonCardTitle, 
  IonButton, 
  IonApp, 
  IonButtons, 
  IonContent,
  IonHeader,
  IonMenu,
  IonMenuButton,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonButton, CommonModule,IonApp, IonButtons, IonContent, IonHeader, IonMenu, IonMenuButton, IonTitle, IonToolbar],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], //Esto es necesario para utilizar swiper en Ionic
})
export class HomePage implements OnInit {
  temaClaro = 'var(--color-claro)';
  temaOscuro = 'var(--color-oscuro)';
  temaActual = this.temaOscuro;
  sliderClaro = 'var(--slider-claro)';
  sliderOscuro = 'var(--slider-oscuro)';
  sliderColorActual = this.sliderOscuro;
  textoClaro = 'var(--texto-claro)';
  textoOscuro = 'var(--texto-oscuro)';
  textoActual= this.textoClaro;

  //Géneros
  genres = [
    {
      title: 'Clásico',
      subtitle: '(Sonidos Eternos)',
      image:
        'https://cdn.pixabay.com/photo/2018/03/21/13/16/saxophone-3246650_1280.jpg',
      description:
        'Suena a orquestas, pianos y violines. Aunque parezca antigua, sigue emocionando y llenando teatros después de cientos de años.',
    },
    {
      title: 'Popular',
      subtitle: '(para todos)',
      image: 'https://cdn.pixabay.com/photo/2017/11/12/16/41/musician-2943109_1280.jpg',
      description:
        'Es la música que canta todo el mundo. Suena en la radio, en las fiestas y hasta en la calle. Es pegajosa, simple y fácil de recordar',
    },
    {
      title: 'Folclórico',
      subtitle: '(tus raíces)',
      image: 'https://cdn.pixabay.com/photo/2020/03/09/04/34/folklore-4914425_1280.jpg',
      description:
        'Es música que te conecta con las raíces. Es como un abrazo sonoro de tu tierra. Cada ritmo, cada instrumento y cada letra tiene algo de historia adentro.',
    },
    {
      title: 'Instrumental',
      subtitle: '(sonidos que hablan)',
      image:
        'https://cdn.pixabay.com/photo/2022/05/24/19/28/cello-7219171_1280.jpg',
      description:
        'Donde los instrumentos cuentan la historia. Ideal para relajar, concentrarse o viajar con la mente mientras suenan guitarras, pianos o violines.',
    },
    {
      title: 'Electrónica',
      subtitle: '(Vibraciones modernas)',
      image:
        'https://cdn.pixabay.com/photo/2022/07/04/04/37/musician-7300353_1280.jpg',
      description:
        'Sonidos digitales y bajos que hacen vibrar el cuerpo. Perfecta para bailar, descontrolarse o simplemente dejarse llevar por el ritmo artificial y moderno.',
    }
  ];

  //Destacados
  destacados = [
    {
      title: 'Slim Shady',
      subtitle: 'Eminem',
      image: 'assets/img/Album/Slim Shady.png',
    },
    {
      title: 'Dont HMU',
      subtitle: 'Anella Herim',
      image: 'assets/img/Album/Dont HMU.png',
    },
    {
      title: 'La Plena',
      subtitle: 'Beelé',
      image: 'assets/img/Album/La plena.png',
    },
    {
      title: 'Las cartas',
      subtitle: 'Luister La voz',
      image: 'assets/img/Album/Las cartas.png',
    },
    {
      title: 'Thinking Out Loud',
      subtitle: 'Ed Sheeran',
      image: 'assets/img/Album/Thinking out loud.png',
    }
  ]

  constructor(private storageService: StorageService, private router: Router) {
  }

  async ngOnInit() {
    await this.loadStoargeData();
    //this.simularCarga();
  }

  async ionViewWillEnter() {
    //llamado cuando la vista está a punto de entrar
    const fromIntro = await this.storageService.get('fromIntro');

    if (fromIntro) {
      console.log('Ya vi la pagina de intro');
        await this.storageService.remove('fromIntro');
    }
  }

  async cambiarTema() {

    if(this.temaActual === this.temaClaro){
      this.temaActual = this.temaOscuro;
      this.sliderColorActual = this.sliderOscuro;
      this.textoActual = this.textoClaro;
      
    } else{
      this.temaActual = this.temaClaro;
      this.sliderColorActual = this.sliderClaro;
      this.textoActual = this.textoOscuro;
    }

    await this.storageService.set('theme', this.temaActual);
    await this.storageService.set('slider', this.sliderColorActual);
    await this.storageService.set('font', this.textoActual);
    //this.cambiarSliderColor();
    console.log('Tema camabiado a:', this.temaActual);
  }

  async loadStoargeData() {
    const savedTheme = await this.storageService.get('theme');
    const savedSlider = await this.storageService.get('slider');
    const savedFont = await this.storageService.get('font');
    if (savedTheme) {
      this.temaActual = savedTheme;
      this.sliderColorActual = savedSlider;
      this.textoActual= savedFont;
      console.log('Tema cargado desde el storage:', this.temaActual);
    }
  }

  /*async simularCarga(){
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
  }*/

  goBack() {
    console.log('Volver a la página anterior');
    this.router.navigateByUrl('/intro');
  }
}
