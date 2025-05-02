import {inject, Injectable} from '@angular/core';
import { Router , NavigationStart} from '@angular/router';
import {filter} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class URLService  {

  _router = inject(Router);
  private currentURL = ``;

  constructor() {
    this.CurrentURL();
  }

  CurrentURL()  {
    this._router.events.pipe(filter(event => event instanceof NavigationStart))
      .subscribe(event => {this.currentURL = event.url});
  }

  isAuthRoute() : boolean{
    return !(this.currentURL.includes('auth') || this.currentURL == '/');
  }

  loginNavigation(path : string , data?:string):Promise<boolean>{
    if(data){
      return this._router.navigate([path , data]);
    }else {
      return this._router.navigate([path]);
    }
  }

  registerNavigation(path : string , data?:string):Promise<boolean>{
    if(data){
      return this._router.navigate([path , data]);
    }else{
      return this._router.navigate([path]);
    }
  }

}
