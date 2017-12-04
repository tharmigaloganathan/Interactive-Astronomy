import { Component, OnInit } from '@angular/core';
import { EditCollectionsService } from "../edit-collections.service";
import { Router} from "@angular/router";

export const ITEM_NAME: string = 'edit_collection_id';

@Component({
  selector: 'app-edit-collection',
  templateUrl: './edit-collection.component.html',
  styleUrls: ['./edit-collection.component.css'],
  providers: [EditCollectionsService]
})
export class EditCollectionComponent implements OnInit {
    private collectionID: string;
    private collection: any = {};

  constructor(private _editCollections: EditCollectionsService, private router: Router) {
      this.collectionID = localStorage.getItem(ITEM_NAME);
      console.log(this.current_id);
      this.getCollection();
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
  }

}
