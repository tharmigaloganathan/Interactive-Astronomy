import { Component, OnInit } from '@angular/core';
import {AuthenticateService} from '../authenticate.service'; //injecting AuthenticateService
import {AuthenticateGuard} from '../authenticate.guard';
import {User} from '../user';
import { Router} from "@angular/router";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    providers: [AuthenticateService, AuthenticateGuard] //registering AuthenticateService as a provider
})
export class LoginComponent implements OnInit {

    private ngSuccessMsg = "";
    private ngErrorMsg ="";
    private users:User[] = [];
    private errorMessage:any = '';

    constructor(private _authenticateService:AuthenticateService, private router: Router) {
        this.getUsers();
        this._authenticateService.logout();
    }

    ngOnInit() {
    }

    getUsers() {
        this._authenticateService.getData()
        .subscribe(
            x => this.users = x);
        console.log(this.users);
    }

    authenticate(username:string,password:string){
        if(username == "" ) {
            this.ngErrorMsg = "enter a username!";
            return;
        }
        if(password == "" ) {
            this.ngErrorMsg = "enter a password!";
            return;
        }
        console.log(username + password);
        for(var i = 0; i < this.users.length; i++) {
            if(this.users[i].username == username) {
                if (this.users[i].password == password){
                    // this._authenticateService.setToken()
                    this._authenticateService.createAndSetToken("admin", true);
                    this.ngErrorMsg = "";
                    this.ngSuccessMsg = "success";
                    this.router.navigate(['./dashboard']);
                    return;
                }
            }
        }
        this.ngErrorMsg = "incorrect credentials!";
        return;
    }

}
