import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Environments} from '../../../Enviroments/Enviroments';
import {Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class HotelsService {

  _httpClient:HttpClient = inject(HttpClient);
  env = Environments;


  getAllHotels(): Observable<any> {
    return this._httpClient.get(this.env.BaseURL + `getAllHotels`);
  }


}
