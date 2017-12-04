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

    private imageURL: string;
    private collections: any[] = [];
    // private oldCollection: any = {};
    private newCollection: any = {};
    private username: string;
    private collectionName: string;
    private entryID: string;

  constructor(private _editCollections: EditCollectionsService) {
      this.imageURL = localStorage.getItem(ITEM_NAME);
      this.username = this._editCollections.findUsername();
      console.log(this.username);
      console.log(this.imageURL);
      console.log(this._editCollections.findUsername());
      console.log(this._editCollections.getCollections());

      this.getCollections();
      console.log(this.collections);
      // this._editCollections.getCollections().then(collections => {
      //
      //   console.log(collections);
      //   this.collection = collections;
      // });
   }

   print(_toPrint:string){
       this.collectionName = _toPrint;
       for(var i=0; i < this.collections.length; i++) {
           if(this.collections[i].name == this.collectionName) {
               this.entryID = this.collections[i]._id;
               this.newCollection = this.collections[i];
           }
       }
       this.newCollection.photos.push(this.imageURL);
       console.log(this.newCollection);
       console.log(this.entryID);
       this._editCollections.postExistingCollection(this.newCollection, this.entryID);

       //find the id of the collection entry
       //copy contents of this entry
       //create a new post request with this entry
   }

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
       // this.collections = this._editCollections.getUserCollections(this._editCollections.findUsername());
   }

  ngOnInit() {
  }



}
