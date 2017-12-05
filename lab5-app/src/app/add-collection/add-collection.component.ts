import { Component, OnInit } from '@angular/core';
import { EditCollectionsService } from "../edit-collections.service";

@Component({
  selector: 'app-add-collection',
  templateUrl: './add-collection.component.html',
  styleUrls: ['./add-collection.component.css'],
  providers: [EditCollectionsService]
})
export class AddCollectionComponent implements OnInit {
    private collections: any[] = [];
    private username: string;
    private newCollection: any = {};

  constructor(private _editCollections: EditCollectionsService) {
      this.username = this._editCollections.findUsername();
      console.log(this.username);
  }

  getUserCollections(_userName:string) {


  }

  createCollection(_name:string, _description:string, _public:boolean) {
      console.log(_name, _description, _public);
      if(_public != null && _public != "") {
          if(_public == "y") this.newCollection.public = true;
          else if(_public == "n") this.newCollection.public = false;
          else this.newCollection.public = false;
      } else this.newCollection.public = false;
      this.newCollection.username = this._editCollections.findUsername();
      this.newCollection.name = _name;
      this.newCollection.description = _description;
      this._editCollections.postCollection(this.newCollection);
  }

  ngOnInit() {
  }



}
