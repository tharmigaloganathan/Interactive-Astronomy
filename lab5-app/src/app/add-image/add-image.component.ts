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
    private collection: any[];

  constructor(private _editCollections: EditCollectionsService) {
      this.imageURL = localStorage.getItem(ITEM_NAME);
      console.log(this.imageURL);
      console.log(this._editCollections.findUsername());
      console.log(this._editCollections.getCollections());
      // this._editCollections.getCollections().then(collections => {
      //
      //   console.log(collections);
      //   this.collection = collections;
      // });
   }

   getCollections() {
       this._editCollections.getRequest()
       .subscribe(
           x => this.collections = x);
       console.log(this.collections);
       return this.collections;
   }

  ngOnInit() {
  }



}
