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
    private imagesToDelete: string[] = [];

  constructor(private _editCollections: EditCollectionsService, private router: Router) {
      this.collectionID = localStorage.getItem(ITEM_NAME);
      console.log(this.current_id);
      this.getCollection();
  }

  deleteImage(_imageURL:string) {
      let newPhotos = []
      for(var i = 0; i < this.collection.photos.length; i++) {
          if(this.collection.photos[i] != _imageURL) {
              newPhotos.push(this.collection.photos[i]);
          }
      }
      this.collection.photos = newPhotos;
      this._editCollections.putCollection(this.collection._id, this.collection);
  }

  saveChanges(_name: string, _description:string, _public: boolean){
      console.log(this.collection);
      if(_name != null && _name != "") {
          this.collection.name = _name;
      }
      if(_description != null && _description != "") {
          this.collection.description = _description;
      }
      if(_public != null && _public != "") {
          if(_public == "y") this.collection.public = true;
          else if(_public == "n") this.collection.public = false;
      }
      this._editCollections.putCollection(this.collection._id, this.collection);
      this.router.navigate(['/user-profile']);
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
