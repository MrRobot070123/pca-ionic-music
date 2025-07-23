import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MusicService {

  urlServer = "https://music.fly.dev";

  constructor() { }

  getTracks(){
    return fetch(`${this.urlServer}/tracks`).then(
      response => response.json()
    )
  }

  getAlbums(){
    return fetch(`${this.urlServer}/albums`).then(
      response => response.json()
    )
  }

  getSongsByAlbum(albumId: string){
    return fetch(`${this.urlServer}/tracks/album/${albumId}`).then(
      response => response.json()
    )
    
  }

  getArtists(){
    return fetch(`${this.urlServer}/artists`).then(
      response => response.json()
    )
  }

  getSongsByArtists(artistId: string){
    return fetch(`${this.urlServer}/tracks/artist/${artistId}`).then(
      response => response.json()
    )
    
  }



  //crear un servicio para obtener los artistas desde el servidor API
  //crear un servicio para obtener las canciones de un artista /tracks/artist/1
}
