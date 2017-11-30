import { Injectable } from '@angular/core';
import {User} from './user';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenticateService {

  constructor(private _http:Http) { }

  getData():Observable<User[]> {
    return this._http.get('http://localhost:8080/api/users')
        .map(this.extractData)
        .catch(this.handleError);
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
