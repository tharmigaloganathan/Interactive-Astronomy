import { Component, OnInit } from '@angular/core';
import {AuthenticateService} from '../authenticate.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  providers: [AuthenticateService]
})
export class MainComponent implements OnInit {

  constructor(private _authenticateService:AuthenticateService) { }

  loggedIn() {
      return this._authenticateService.loggedIn();
  }

  ngOnInit() {}

}
