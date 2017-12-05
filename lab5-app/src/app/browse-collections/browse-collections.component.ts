import { Component, OnInit } from '@angular/core';
import { EditCollectionsService } from "../edit-collections.service";
import { Router} from "@angular/router";
import {AuthenticateService} from '../authenticate.service';

export const ITEM_NAME: string = 'collection_id';

@Component({
  selector: 'app-browse-collections',
  templateUrl: './browse-collections.component.html',
  styleUrls: ['./browse-collections.component.css'],
  providers: [AuthenticateService, EditCollectionsService]
})
export class BrowseCollectionsComponent implements OnInit {
    private collections: any[] = [];
    private username: string;

  constructor(private _authenticateService:AuthenticateService, private _editCollections: EditCollectionsService, private router: Router) {
      this.getCollections();
      console.log(this.collections);
  }

  loggedIn() {
      return this._authenticateService.loggedIn();
  }

  viewCollection(_collectionID : string) {
      localStorage.setItem(ITEM_NAME, _collectionID);
      this.router.navigate(['./view-collection']);
  }

  getCollections() {
      this._editCollections.getCollections().then(collections => {
          console.log(collections);
          let numberOfCollections = collections.length;
          if(!this._authenticateService.loggedIn()) {
              numberOfCollections = 11;
          }
          for(var i = 0; i < numberOfCollections; i++) {
              if(collections[i].public == true) {
                  this.collections.push(collections[i]);
                  console.log(this.collections);
              }
          }
          //sorting the collection by rating
          this.collections.sort((a, b) => {

            if( a.sumOfRatings==0 || a.numberOfRatings==0) let ratingA = 0;
            else let ratingA = a.sumOfRatings/a.numberOfRatings;

            if( b.sumOfRatings==0 || b.numberOfRatings==0) let ratingB = 0;
            else let ratingB = b.sumOfRatings/b.numberOfRatings;

            if (ratingA > ratingB) return -1;
            else if (ratingA < ratingB) return 1;
            else return 0;
          });
      });
  }

  ngOnInit() {
  }

}
