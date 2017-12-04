import { Component, OnInit } from '@angular/core';
import { EditCollectionsService } from "../edit-collections.service";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  providers: [EditCollectionsService]
})
export class UserProfileComponent implements OnInit {
    private collections: any[] = [];
    private username: string;

  constructor(private _editCollections: EditCollectionsService) {
      this.username = this._editCollections.findUsername();
      this.getCollections();
      console.log(this.collections);

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
