import {Component} from '@angular/core';
import {SolaceConnector} from './solaceConnector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'angular-solclient-full-error';

  constructor() {
    new SolaceConnector().connect()
  }
}
