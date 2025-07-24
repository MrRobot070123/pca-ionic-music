import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule, NavController, ModalController } from '@ionic/angular';
import { MusicService } from '../services/music.service';
import { SongsModalPage } from '../songs-modal/songs-modal.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [CommonModule, IonicModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], //Esto es necesario para utilizar swiper en Ionic
})
export class HomePage implements OnInit {
  isToggled = false; //variable que controla el toggle
  tracks: any;
  albums: any;
  artists: any;
  song: any={
    name: '',
    preview_url: '',
    playing: false
  };

  currentSong: any;
  newTime: any;

  onToggleChange(event: any) { //Escucha el cambio del toggle
    this.isToggled = event.detail.checked; //actualiza el valor de isToggled
    console.log('Toggle:', this.isToggled);
    this.cambiarTema(this.isToggled); //llama a la funcion para cambiar el tema
  }

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

  constructor(
    private storageService: StorageService,
    private router: Router,
    private navCtl: NavController,
    private musicService: MusicService,
    private modalCtrl: ModalController
  ) {
  }

  async ngOnInit() {
    this.loadAlbums();
    this.loadArtists();
    this.loadTracks();
    await this.loadStoargeData();
  }

  loadTracks() {
    this.musicService.getTracks().then(tracks => {
      this.tracks = tracks;
      console.log(this.tracks, "Las canciones");
    })
  }

  loadAlbums() {
    this.musicService.getAlbums().then(albums => {
      this.albums = albums;
      console.log(this.tracks, "los albums");
    })
  }

  loadArtists() {
    this.musicService.getArtists().then(artists => {
      this.artists = artists;
      console.log(this.tracks, "los artistas");
    })
  }

  async ionViewWillEnter() {
    //llamado cuando la vista está a punto de entrar
    const fromIntro = await this.storageService.get('fromIntro');

    if (fromIntro) {
      console.log('Ya vi la pagina de intro');
      await this.storageService.remove('fromIntro');
    }
  }

  async cambiarTema(toggle: boolean) {
    this.isToggled = toggle;
    const body = document.body;
    if (this.isToggled) {
      body.classList.add('dark-theme');
    } else {
      body.classList.remove('dark-theme');
    }
    await this.storageService.set('toggle', this.isToggled);
  }

  async loadStoargeData() {
    const savedToggle = await this.storageService.get('toggle');
    if (savedToggle !== null) {
      this.isToggled = savedToggle;
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

  exit() { // Cerrar sesion corregir la salida
    this.storageService.set('login', false);
    console.log('Cerrando sesion');
    this.navCtl.navigateBack('/login');
  }

  async showSongs(albumId: string) {
    console.log("album id: ", albumId)
    const songs = await this.musicService.getSongsByAlbum(albumId);
    console.log("songs: ", songs)
    const modal = await this.modalCtrl.create({
      component: SongsModalPage,
      componentProps: {
        songs: songs
      }
    });
    modal.onDidDismiss().then((result) => {
      if(result.data){
        console.log("cancion recibida ", result.data);
        this.song = result.data;
      }
    })
    modal.present();
  }

  async showSongsByArtists(artistId: string) {
    console.log("artista id: ", artistId)
    const songs = await this.musicService.getSongsByArtists(artistId);
    console.log("songs: ", songs)
    const modal = await this.modalCtrl.create({
      component: SongsModalPage,
      componentProps: {
        songs: songs
      }
    });
    modal.onDidDismiss().then((result) => {
      if(result.data){
        console.log("cancion recibida ", result.data);
        this.song = result.data;
      }
    })
    modal.present();
  }

  play(){
    this.currentSong = new Audio(this.song.preview_url);
    this.currentSong.play();
    this.currentSong.addEventListener("timeupdate", ()=>{
      this.newTime = this.currentSong.currentTime / this.currentSong.duration;
    })
    this.song.playing = true;
  }

  pausa(){
    this.currentSong.pause();
    this.song.playing = false;
  }

  formatTime(seconds: number){
    if(!seconds || isNaN(seconds)) return "0:00";
    const minutes = Math.floor(seconds/60);
    const remaningSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remaningSeconds.toString().padStart(2, '0')}`
  }
}
