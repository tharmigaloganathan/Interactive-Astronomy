import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import * as jwt_decode from 'jwt-decode';
import { DatePipe } from '@angular/common';

import {User} from './user';
import { tokenNotExpired } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

export const TOKEN_NAME: string = 'jwt_token';
declare const Buffer;

@Injectable()
export class AuthenticateService {
    //VARIABEL DECLARATION
    private iat: any;
    private exp: any;
    private newToken: any;
    private buffer: any;
    private url: string = 'http://localhost:8080/api/';
    private headers = new Headers({ 'Content-Type': 'application/json' });

    constructor(private _http:Http) { }

    //POSTS THE NEW ACCOUNT TO THE DATABASE
    postNewAccount(_newUser:any) {
        const body = {
            admin: false,
            username: _newUser.username,
            password: _newUser.password,
            lastname: _newUser.lastname,
            firstname: _newUser.firstname
        }
        const req = this._http.post(`${this.url}/users`, body);
        req.subscribe();
    }

    //ALL FUNCTIONS BELOW DEAL WITH TOKEN IN LOCAL STORAGE
    getToken(): any {
        return localStorage.getItem(TOKEN_NAME);
    }
    addExpAndIatToToken(_token: any):any {
        this.iat = new Date();
        this.exp = new Date();
        this.exp = new Date(this.exp.setHours(this.iat.getHours() + 2));
        _token.exp = this.exp;
        _token.iat = this.exp;
        return _token;
    }
    checkTokenExpirationDate(_exp:any): boolean {
        this.iat = new Date();
        this.exp = new Date(_exp);
        return this.exp > this.iat;
    }
    encodeBase64(_token: any): string {
        _token = new Buffer(JSON.stringify(_token)).toString("base64");
        return _token;
    }
    decodeBase64(_token: string): any {
        _token = JSON.parse(atob(_token));
        return _token;
    }
    isTokenValid(): boolean {
        return this.checkTokenExpirationDate(this.decodeBase64(this.getToken()).exp);
    }
    isAdmin() {
        if(this.getToken() == null) return false;
        return this.decodeBase64(this.getToken()).admin;
    }
    loggedIn() {
        if(this.getToken() == null) return false;
        return this.isTokenValid();
    }
    logout() {
        localStorage.removeItem('jwt_token');
    }
    createAndSetToken(_username: string, _admin: boolean) {
        this.newToken = {
            username: _username,
            admin: _admin,
        }
        this.newToken = this.addExpAndIatToToken(this.newToken);
        localStorage.setItem(TOKEN_NAME, this.encodeBase64(this.newToken));
    }

    //GETS DATA FROM THE SERVER
    getData():Observable<User[]> {

        return this._http.get(`${this.url}/users`)
        .map(this.extractData)
        .catch(this.handleError);
    }

    getUsers(): Promise<any> {
        return this._http
        .get(`${this.url}/users`)
        .toPromise()
        .then(res => res.json())
        .catch(this.handleError);
    }

    //EXTRACTS DATA FROMT HE REQUEST
    private extractData(res:Response) {
        let body = res.json();
        return body;
    }

    private handleError(error:any) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        let errMsg = (error.message) ? error.message :
        error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }



}
