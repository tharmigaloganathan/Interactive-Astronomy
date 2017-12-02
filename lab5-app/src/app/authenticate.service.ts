import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import * as jwt_decode from 'jwt-decode';
import { DatePipe } from '@angular/common';

import {User} from './user';
import { tokenNotExpired } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

export const TOKEN_NAME: string = 'jwt_token';

@Injectable()
export class AuthenticateService {

    private today: any;
    private url: string = 'http://localhost:8080/api/';
    private headers = new Headers({ 'Content-Type': 'application/json' });
    //maybe user should be authenticated within this service? OR give a method the component can user to obtain a token

    // constructor(private _http:Http, public jwtHelper: JwtHelper) { }
    constructor(private _http:Http) { }

    //ALL FUNCTIONS BELOW DEAL WITH TOKEN IN LOCAL STORAGE
    loggedIn() {
        return tokenNotExpired();
    }
    logout() {
        localStorage.removeItem('id_token');
    }
    getToken(): string {
        return localStorage.getItem(TOKEN_NAME);
    }
    setToken(token: string): void {
        localStorage.setItem(TOKEN_NAME, token);
    }
    getTokenExpirationDate(token: string): Date {
        const decoded = jwt_decode(token);

        if (decoded.exp === undefined) return null;

        const date = new Date(0);
        date.setUTCSeconds(decoded.exp);
        return date;
    }
    createAndSetToken(username: string, admin: boolean) {
        //token with username, admin, current time, expiry time
        this.today = Date.now();
        // const encoded = jwt_decode(token);
    }

    isTokenExpired(token?: string): boolean {
        if(!token) token = this.getToken();
        if(!token) return true;

        const date = this.getTokenExpirationDate(token);
        if(date === undefined) return false;
        return !(date.valueOf() > new Date().valueOf());
    }

    //CREATES A BRAND NEW TOKEN PUTS IT IN THE USER'S LOCAL STORAGE
    login(credentials) {
        this._http.post(`${this.url}/auth`, credentials)
        .map(res => res.json())
        .subscribe(
            // We're assuming the response will be an object
            // with the JWT on an id_token key
            data => localStorage.setItem('id_token', data.id_token),
            error => console.log(error)
        );
    }

    // login(user): Promise<string> {
    //     //this creates a new header for the assignment
    //     return this._http
    //     .post(`${this.url}/auth`, JSON.stringify(user), { headers: this.headers })
    //     .toPromise()
    //     .then(res => res.text());
    // }

    getData():Observable<User[]> {
        this.today = new Date();
        // this.today = Date.now();
        console.log(this.today);
        return this._http.get(`${this.url}/users`)
        .map(this.extractData)
        .catch(this.handleError);
    }

    private isAuthenticated() {
    }

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
