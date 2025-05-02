import {afterNextRender, inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
// import {SignInDate, Userdata, userToken} from '../../Interfaces/User Date/userdata';
import {Environments} from '../../../Enviroments/Enviroments';
import {BehaviorSubject, Observable} from 'rxjs';
import {jwtDecode} from "jwt-decode"
import {URLService} from '../NavServices/urlservice.service';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {


  _uRLService : URLService = inject(URLService);
  _httpClient  = inject(HttpClient);
  env = Environments;
  private userToken !: string | null ;
  userTokenDecoded : BehaviorSubject<any> = new BehaviorSubject({
    "id": "",
    "name": "",
    "role": "",
    "iat": 0,
    "exp": 0
  });





  Signup(userDate: any) : Observable<any> {
    return this._httpClient.post(this.env.BaseURL + `auth/register` , userDate);
  }

  signin(loginUser : any) : Observable<any> {
    return this._httpClient.post(this.env.BaseURL + `auth/login` , loginUser);
  }

  logout() {
    localStorage.removeItem('userToken');
    this.userTokenDecoded.next({
      "id": "",
      "name": "",
      "role": "",
      "iat": 0,
      "exp": 0
    });
    this._uRLService.loginNavigation('/auth/register');
  }

  UserToken(){
    if(localStorage.getItem('userToken')){
      this.userToken = localStorage.getItem('userToken');
      this.userTokenDecoded.next(jwtDecode(this.userToken!))
    }
  }


  longedINChecker(){
    if(localStorage.getItem('userToken')){
      this.userToken = localStorage.getItem('userToken');
      this.userTokenDecoded.next(jwtDecode(this.userToken!))
    }
  }

}
