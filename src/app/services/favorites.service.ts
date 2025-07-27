import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  urlServer = "https://music.fly.dev";
  responseBody: any

  constructor(private authService : AuthService) { }

  //Obtiene canciones
  async getFavorite(){
    const userId = this.authService.userId();
    return fetch(`${this.urlServer}/user_favorites/${userId}`).then(
      response => response.json()
    )
  }

  //Agrega favoritos
  async addFavorite(idUser: number, idCancion: number) {
      const body = {
        favorite_track: {
          user_id: idUser,
          track_id: idCancion
        }
      };

      console.log("ID USUARIO: " ,idUser, " ID CANCION: " , idCancion);

      return fetch(`${this.urlServer}/favorite_tracks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      })
        .then(async response => {
          this.responseBody = await response.json().catch(() => null);
          if (!response.ok) {         
            return {
              status: "ERROR",
              code: response.status,
              msg: "Fallo al marcar como favorita"
            };

          }

          return {
            status: "OK",
            data: this.responseBody
          };
        })
        .catch(error => {
          console.log(error, "error favoriteservice")
          return {
            status: "ERROR",
            msg: "No se pudo conectar al servidor"
          };
        });
    }

  //Elimina favoritos
  deleteFavorite(){
    //Metodo Delete
  }

}
