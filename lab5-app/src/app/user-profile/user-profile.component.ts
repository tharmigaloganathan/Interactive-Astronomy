import { Component, OnInit } from '@angular/core';
import { EditCollectionsService } from "../edit-collections.service";
import { Router} from "@angular/router";
import {AuthenticateService} from '../authenticate.service'; //injecting AuthenticateService
import {AuthenticateGuard} from '../authenticate.guard';

export const ITEM_NAME: string = 'collection_id';
export const EDIT_NAME: string = 'edit_collection_id';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  providers: [EditCollectionsService]
})
export class UserProfileComponent implements OnInit {
    private collections: any[] = [];
    private username: string;

  constructor(private _authenticateService:AuthenticateService, private _editCollections: EditCollectionsService, private router: Router) {
      this.username = this._editCollections.findUsername();
      this.getCollections();
      console.log(this.collections);
      console.log(this._authenticateService.loggedIn());
   }

   editCollection(_collectionID: string) {
       localStorage.setItem(EDIT_NAME, _collectionID);
   }

   deleteCollection(_collectionID : string){
       this._editCollections.deleteCollection(_collectionID);
       window.location.reload();
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
               if(collections[i].username == this.username) {
                   this.collections.push(collections[i]);
                   console.log(this.collections);
               }
           }
       });
   }

  ngOnInit() {
  }

}
