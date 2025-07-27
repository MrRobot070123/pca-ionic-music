import { Injectable } from '@angular/core';
import { Storage} from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _storage: Storage | null = null;

  constructor( private storage: Storage) { 
    this.init();
  }

  async init () {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  private async ready (){
    if (!this._storage){
      await this.init();
    }
  }

  // setear un valor en el storage
  public async set(key: string, value: any){ 
    await this.ready();
    return this._storage?.set(key, value);
  }

  // obtener un valor del storage
  public async get(key: string){
    await this.ready();
    return this._storage?.get(key);
  }

  // Eliminar un valor del storage
  public async remove(key: string){
    await this.ready();
    return this._storage?.remove(key);
  }

  // Limpiar todo el storage
  public async clear(){
    await this.ready();
    return this._storage?.clear();
  }

  // Obtener llaves del storage
  public async keys(){
    await this.ready();
    return this._storage?.keys();
  }

  // Obtener el tamaño del storage
  // Nota: El tamaño se refiere al número de elementos almacenados.
  public async length(){
    await this.ready();
    return this._storage?.length();
  }
}
