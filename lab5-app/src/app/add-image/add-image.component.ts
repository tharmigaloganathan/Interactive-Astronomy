import { Component, OnInit } from '@angular/core';
import { EditCollectionsService } from "../edit-collections.service";

export const ITEM_NAME: string = 'image_url';

@Component({
    selector: 'app-add-image',
    templateUrl: './add-image.component.html',
    styleUrls: ['./add-image.component.css'],
    providers: [EditCollectionsService]
})

export class AddImageComponent implements OnInit {
    //VARIABLE DECLARATIONS
    private imageURL: string;
    private collections: any[] = [];
    private newCollection: any = {};
    private username: string;
    private collectionName: string;
    private entryID: string;

    //CONSTRUCTOR GETS IMAGEURL FROM LOCAL STORAGE AND GETS COLLECTIONS FROM THE SERVER
    constructor(private _editCollections: EditCollectionsService) {
        this.imageURL = localStorage.getItem(ITEM_NAME);
        this.username = this._editCollections.findUsername();
        this.getCollections();
    }

    //THIS FUNCTION ADDS IMAGE TO PHOTOS ARRAY OF COLLECTION AND "PUT"S ENTIRE COLLECTION INTO DATABASE
    print(_toPrint:string){
        this.collectionName = _toPrint;
        for(var i=0; i < this.collections.length; i++) {
            if(this.collections[i].name == this.collectionName) {
                this.entryID = this.collections[i]._id;
                this.newCollection = this.collections[i];
            }
        }
        this.newCollection.photos.push(this.imageURL);
        this._editCollections.putCollection(this.entryID, this.newCollection);
    }

    //THIS FUNCTION GETS THE COLLECTIONS FROM THE SERVER
    getCollections() {
        this._editCollections.getCollections().then(collections => {
            console.log(collections);
            for(var i = 0; i < collections.length; i++) {
                if(collections[i].username == this.username) {
                    this.collections.push(collections[i]);
                    console.log(this.collections);
                }
            }
        });
    }

}
