import { Component, OnInit } from '@angular/core';
import { EditCollectionsService } from "../edit-collections.service";
import { ManageRatingsService } from "../manage-ratings.service";
import { Router} from "@angular/router";
declare var $:any;

export const ITEM_NAME: string = 'collection_id';

@Component({
  selector: 'app-view-collection',
  templateUrl: './view-collection.component.html',
  styleUrls: ['./view-collection.component.css'],
  providers: [EditCollectionsService,ManageRatingsService]
})
export class ViewCollectionComponent implements OnInit {
    private collection: any;
    private collectionID: string;
    private errormsg: string;
    private username: string;
    private ratings: any[] = [];

  constructor(private _editCollections: EditCollectionsService,private _manageRatings: ManageRatingsService, private router: Router) {
      this.username = this._editCollections.findUsername();
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
       if(this.collection.username == this.username)
           this.errormsg = "error, you cannot rate your own collection";

   }

   hasRated() {
       for(var i = 0; i < this.ratings.length; i++) {
           if(this.ratings[i].username == this.username && this.ratings[i].collection_name == this.collection.name) {
               this.errormsg = "error, you have already rated this collection";
               return true;
           }
       }
       return false;
   }

   submitRating() {
       if(this.hasRated()) return;
       if(this.isOwner()) return;
       //post rating
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
        maxRating: 10
      })
    ;
  }

}
