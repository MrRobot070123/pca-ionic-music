import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  urlServer = 'https://music.fly.dev';
  responseBody: any;
  selectTrack: any;
  allFavorites: any;

  constructor(private authService: AuthService, private storageService: StorageService) {}

  //Obtiene la cancion actual
  setSelectTrack(track: number) {
    this.selectTrack = track;
  }

  //Obtiene canciones
  async getFavorite(userID : any) {
    console.log('Entre a getFavorite el valor el usuario es: ', userID);
    await this.getAllFavorites().then((response) => {
      this.allFavorites = response;
    });

    if (!Array.isArray(this.allFavorites)) {
      console.error('Los favoritos no son un arreglo:', this.allFavorites);
      return [];
    }
    return this.allFavorites.filter(
      (favorite: any) => favorite.user_id === userID
    );
  }

  async getAllFavorites() {
    return fetch(`${this.urlServer}/favorite_tracks`).then((response) =>
      response.json()
    );
  }

  //Agrega favoritos
  async addFavorite(idUser: number, idCancion: number) {
    const body = {
      favorite_track: {
        user_id: idUser,
        track_id: idCancion,
      },
    };

    return fetch(`${this.urlServer}/favorite_tracks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then(async (response) => {
        this.responseBody = await response.json().catch(() => null);
        if (!response.ok) {
          return {
            status: 'ERROR',
            code: response.status,
            msg: 'Fallo al marcar como favorita',
          };
        }
        return {
          status: 'OK',
          data: this.responseBody,
        };
      })
      .catch((error) => {
        console.log(error, 'error favoriteservice');
        return {
          status: 'ERROR',
          msg: 'No se pudo conectar al servidor',
        };
      });
  }

  //Elimina favoritos
  deleteFavorite(trackID: number) {
    console.log('La cancion a eliminar es: ', trackID);

    return fetch(`${this.urlServer}/favorite_tracks/${trackID}`, {
      method: 'DELETE',
    })
      .then(async (response) => {
        this.responseBody = await response.json().catch(() => null);
        if (!response.ok) {
          return {
            status: 'ERROR',
            code: response.status,
            msg: 'Fallo al quitar cancion como favorita',
          };
        }
        return {
          status: 'OK',
          data: this.responseBody,
        };
      })
      .catch((error) => {
        console.log(error, 'error favoriteservice');
        return {
          status: 'ERROR',
          msg: 'No se pudo conectar al servidor',
        };
      });
  }
}
