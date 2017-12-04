import { Component, OnInit } from '@angular/core';
import { EditCollectionsService } from "../edit-collections.service";
import { Router} from "@angular/router";

export const ITEM_NAME: string = 'collection_id';

@Component({
  selector: 'app-browse-collections',
  templateUrl: './browse-collections.component.html',
  styleUrls: ['./browse-collections.component.css'],
  providers: [EditCollectionsService]
})
export class BrowseCollectionsComponent implements OnInit {
    private collections: any[] = [];
    private username: string;

  constructor(private _editCollections: EditCollectionsService, private router: Router) {
      this.username = this._editCollections.findUsername();
      this.getCollections();
      console.log(this.collections);
  }

  viewCollection(_collectionID : string) {
      // console.log(this.images[i]);
      localStorage.setItem(ITEM_NAME, _collectionID);
      this.router.navigate(['./view-collection']);
  }

  getCollections() {
      this._editCollections.getCollections().then(collections => {
          console.log(collections);
          for(var i = 0; i < collections.length; i++) {
              if(collections[i].public == true) {
                  this.collections.push(collections[i]);
                  console.log(this.collections);
              }
          }
      });
  }

  ngOnInit() {
  }

}
