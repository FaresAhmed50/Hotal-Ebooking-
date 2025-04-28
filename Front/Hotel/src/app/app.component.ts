import {Component, inject, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {FlowbiteService} from './Feature/servives/flowbit/flowbit.service';

@Component({
  selector: 'app-root',
  imports: [],
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
