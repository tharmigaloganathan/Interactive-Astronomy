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
    //VARIBALE DECLARATION
    private collections: any[] = [];
    private username: string;

    //CONSTRUCTOR CALLS FUNCTION TO RETRIVE ALL COLLECTIONS FROM THE SERVER
    constructor(private _authenticateService:AuthenticateService, private _editCollections: EditCollectionsService, private router: Router) {
        this.getCollections();
    }

    //RETURNS IF USER IS LOGGED IN
    loggedIn() {
        return this._authenticateService.loggedIn();
    }

    //PUTS ID OF COLLECTION INTO LOCAL STORAGE AND REDIRECTS USER
    viewCollection(_collectionID : string) {
        localStorage.setItem(ITEM_NAME, _collectionID);
        this.router.navigate(['./view-collection']);
    }

    //FUNCTION THE RETRIEVES COLLECTIONS FROM THE SERVER
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
                var ratingA = 0;
                var ratingB = 0;

                if( a.sumOfRatings==0 || a.numberOfRatings==0) ratingA = 0;
                else ratingA = a.sumOfRatings/a.numberOfRatings;

                if( b.sumOfRatings==0 || b.numberOfRatings==0) ratingB = 0;
                else ratingB = b.sumOfRatings/b.numberOfRatings;

                if (ratingA > ratingB) return -1;
                else if (ratingA < ratingB) return 1;
                else return 0;
            });
        });
    }

    ngOnInit(){}

}
