import { Component, OnInit } from '@angular/core';
import {AuthenticateService} from '../authenticate.service'; //injecting AuthenticateService
import {User} from '../user';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    providers: [AuthenticateService] //registering AuthenticateService as a provider
})
export class LoginComponent implements OnInit {

    private users:User[] = [];
    private errorMessage:any = '';

    constructor(private _authenticateService:AuthenticateService) {
        this.getUsers();
    }

    ngOnInit() {
    }

    getUsers() {
        this._authenticateService.getData()
        .subscribe(
            x => this.users = x);
        console.log(this.users);
    }

}
