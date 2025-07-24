import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonLabel, IonItem, IonAvatar } from '@ionic/angular/standalone';
import { NavParams, ModalController } from '@ionic/angular';


@Component({
  selector: 'app-songs-modal',
  templateUrl: './songs-modal.page.html',
  styleUrls: ['./songs-modal.page.scss'],
  standalone: true,
  imports: [IonAvatar, IonItem, IonLabel, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class SongsModalPage implements OnInit {

  songs: any;
  constructor(private navParams: NavParams, private modalCtrl: ModalController) { }

  ngOnInit() {
    this.songs = this.navParams.data['songs']
    console.log("Recibí: ",this.songs )
  }


  async selectSong(song:any){
    console.log("cancion seleccionada: ", song);
    await this.modalCtrl.dismiss(song) 
  }

}
