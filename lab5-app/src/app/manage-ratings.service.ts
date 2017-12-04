import { Injectable } from '@angular/core';
import { PhotoCollection } from './photocollection';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ManageRatingsService {
    private username: string;
    private ratings: any[];
    private temp: any[] = [];
    private url: string = 'http://localhost:8080/api/';
    private userID: string;

  constructor(private _http:Http) { }


      getRatings(): Promise<any> {
          return this._http
          .get(`${this.url}/ratings`)
          .toPromise()
          .then(res => res.json())
          .catch(this.handleError);
      }

      postRating(rating: any) {
          const body = {
              username: rating.username,
              collection_name: rating.collection_name,
              collection_username: rating.collection_username,
              rating_value: rating.rating_value
          }
          console.log(body);
          const req = this._http.post(`${this.url}/ratings`, body);
          req.subscribe();
      }

      userHasRated(_userName:string, _collection_name:string){

      }

      getAllRatings() {
          this.getRatings().then(ratings => {
              console.log(ratings);
              for(var i = 0; i < ratings.length; i++) {
                 this.ratings.push(ratings[i]);
              }
              console.log(this.ratings);
              return this.ratings;
          });
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
