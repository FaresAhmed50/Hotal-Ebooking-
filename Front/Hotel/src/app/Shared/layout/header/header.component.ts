import {Component, inject, OnInit} from '@angular/core';
import {URLService} from '../../../Core/service/NavServices/urlservice.service';
import {AuthServiceService} from '../../../Core/service/auth/auth.service';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent  implements OnInit{
  _uRLService:URLService = inject(URLService);
  _authService : AuthServiceService = inject(AuthServiceService);




  ngOnInit(): void {
    this._uRLService.isAuthRoute();
  }


  logOut(){
    this._authService.logout();
  }

}
