import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonLabel, IonItem, IonAvatar, ModalController, IonButtons, IonButton, IonIcon } from '@ionic/angular/standalone';


@Component({
  selector: 'app-songs-modal',
  templateUrl: './songs-modal.page.html',
  styleUrls: ['./songs-modal.page.scss'],
  standalone: true,
  imports: [IonIcon, IonButton, IonButtons,   IonAvatar, IonItem, IonLabel, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class SongsModalPage implements OnInit {

  @Input() songs: any; 
  constructor( private modalCtrl: ModalController) { }

  ngOnInit() {

  }
  async selectSong(song:any){
    await this.modalCtrl.dismiss(song) 
  }
  async closeModal() {
    await this.modalCtrl.dismiss();
  }

}
