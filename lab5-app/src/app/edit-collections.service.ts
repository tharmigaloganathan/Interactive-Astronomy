import { Injectable } from '@angular/core';
import { PhotoCollection } from './photocollection';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class EditCollectionsService {
    private username: string;
    private collections: any[];
    private temp: any[] = [];
    private url: string = 'http://localhost:8080/api/';
    private userID: string;


    constructor(private _http:Http) {

    }

    getCollections(): Promise<any> {
        return this._http
        .get(`${this.url}/photocollections`)
        .toPromise()
        .then(res => res.json())
        .catch(this.handleError);
    }

    postCollection(collection: any) {
        const body = {
            username: collection.username,
            description: collection.description,
            name: collection.name,
            numberOfRatings: 0,
            sumOfRatings: 0,
            public: collection.public,
            photos: []
        }
        console.log(body);
        const req = this._http.post(`${this.url}/photocollections`, body);
        req.subscribe();
    }

    findUsername(){
        this.username = localStorage.getItem('jwt_token');
        this.username = JSON.parse(atob(this.username));
        this.username = this.username.username;
        return this.username;
    }


    private handleError(error:any) {
        let errMsg = (error.message) ? error.message :
        error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }


}
