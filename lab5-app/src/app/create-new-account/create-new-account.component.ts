import { Component, OnInit } from '@angular/core';
import {AuthenticateService} from '../authenticate.service';
import { Router} from "@angular/router";

@Component({
    selector: 'app-create-new-account',
    templateUrl: './create-new-account.component.html',
    styleUrls: ['./create-new-account.component.css'],
    providers: [AuthenticateService]
})
export class CreateNewAccountComponent implements OnInit {

    private newUser: any = {};
    private users: any[] = [];
    private errormsg: string;

    constructor(private _authenticateService:AuthenticateService, private router: Router) {
        this.getUsers();
        console.log(this.users);
    }

    validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    emailExistsInDatabase(_username:string){
        for(var i = 0; i < this.users.length; i++) {
            console.log(this.users[i].username);
            console.log(_username);
            if(this.users[i].username == _username) {
                return true;
            }
        }
        return false;
    }

    createAccount(_fname:string, _lname:string, _username:string, _password:string) {
        if(this.emailExistsInDatabase(_username)) {
            this.errormsg = "error, this email is already taken!";
            return;
        }
        if(!this.validateEmail(_username)) {
            this.errormsg = "error, this is not a valid email!";
            return;
        }
        if(_password == null || _password == "") {
            this.errormsg = "error, you must enter a password!";
            return;
        }
        if(_username == null || _username== "") {
            this.errormsg = "error, you must enter an email!";
            return;
        }
        this.newUser.firstname = _fname;
        this.newUser.lastname = _lname;
        this.newUser.username = _username;
        this.newUser.password = _password;
        this._authenticateService.postNewAccount(this.newUser);
        this._authenticateService.createAndSetToken(_username, false);
    }

    getUsers() {
        this._authenticateService.getUsers().then(users => {
            console.log(users);
            for(var i = 0; i < users.length; i++) {
                this.users.push(users[i]);
                console.log(this.users);
            }
        });
    }

    ngOnInit() {
    }

}
