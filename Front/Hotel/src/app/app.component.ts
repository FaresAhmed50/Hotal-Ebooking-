import {Component, inject, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {FlowbiteService} from './Feature/servives/flowbit/flowbit.service';
import {FooterComponent} from './Shared/layout/footer/footer.component';
import {HeaderComponent} from './Shared/layout/header/header.component';

@Component({
  selector: 'app-root',
  imports: [
    FooterComponent,
    HeaderComponent,
    RouterOutlet
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'Hotel';


  _flowbiteService : FlowbiteService = inject(FlowbiteService);

  ngOnInit() {
    this._flowbiteService.loadFlowbite(flowbite => {});

  }

}
