import { Component, OnInit } from '@angular/core';
import { EditCollectionsService } from "../edit-collections.service";
import { ManageRatingsService } from "../manage-ratings.service";
import { Router} from "@angular/router";
import {AuthenticateService} from '../authenticate.service';
declare var $:any;

export const ITEM_NAME: string = 'collection_id';

@Component({
  selector: 'app-view-collection',
  templateUrl: './view-collection.component.html',
  styleUrls: ['./view-collection.component.css'],
  providers: [AuthenticateService, EditCollectionsService, ManageRatingsService]
})
export class ViewCollectionComponent implements OnInit {
    private collection: any;
    private collectionID: string;
    private errormsg: string;
    private username: string;
    private successmsg: string;
    private ratings: any[] = [];
    private newRating: any = {};
    private rating_value: number;
    private has_rated: boolean;

  constructor(private _authenticateService:AuthenticateService, private _editCollections: EditCollectionsService,private _manageRatings: ManageRatingsService, private router: Router) {
      if(this._authenticateService.loggedIn()){
        this.username = this._editCollections.findUsername();
      }
      this.collectionID = localStorage.getItem(ITEM_NAME);
      this.getCollection();
      this.getRatings();
   }

   getRatings() {
       this._manageRatings.getRatings().then(ratings => {
           console.log(ratings);
           for(var i = 0; i < ratings.length; i++) {
               this.ratings.push(ratings[i]);
           }
           console.log(this.ratings);
       });
   }

   isOwner() {
       if(this.collection.username == this.username){
           this.errormsg = "error, you cannot rate your own collection!";
           return true;
       }
       return false;
   }

   hasRated() {
       if(this.has_rated) {
           this.errormsg = "error, you have already rated this collection!";
           return true;
       }
       for(var i = 0; i < this.ratings.length; i++) {
           if(this.ratings[i].username == this.username && this.ratings[i].collection_name == this.collection.name) {
               this.errormsg = "error, you have already rated this collection!";
               return true;
           }
       }
       return false;
   }

   updateRating(value:number){
       this.rating_value = value;
   }

   submitRating(collection_id:string, collection_name:string, collection_username:string) {
       this.successmsg = "";
       if(!this._authenticateService.loggedIn()) {
           this.errormsg = "error, you have to be logged in to submit a rating!";
           return;
       }
       if(this.hasRated()) return;
       if(this.isOwner()) return;

       //updating sumOfRatings and numberOfRatings in photoCollections table
       this.collection.sumOfRatings = this.collection.sumOfRatings+ this.rating_value;
       this.collection.numberOfRatings = this.collection.numberOfRatings + 1;
       this._editCollections.putCollection(collection_id, this.collection );

       //adding a new entry to ratings table
       this.newRating.username = this.username;
       this.newRating.collection_name = collection_name;
       this.newRating.collection_username = collection_username;
       this.newRating.rating_value = this.rating_value;
       this._manageRatings.postRating(this.newRating);
       this.has_rated = true;
       this.successmsg = "success! your rating has been submitted!"
   }

  getCollection() {
      this._editCollections.getCollections().then(collections => {
          console.log(collections);
          for(var i = 0; i < collections.length; i++) {
              if(collections[i]._id == this.collectionID) {
                  this.collection = collections[i];
                  console.log(this.collection);
              }
          }
      });
  }

  ngOnInit() {
      $('.rating')
      .rating({
        initialRating: 0,
        maxRating: 10,
        onRate: (value) => {
            this.updateRating(value);
        }
      })
    ;
  }

}
