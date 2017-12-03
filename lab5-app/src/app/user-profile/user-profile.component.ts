import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor() {
      // this._editCollections.getCollections().then(collections => {
      //     console.log(collections);
      //     for(var i = 0; i < collections.length; i++) {
      //         if(collections[i].username == this.username) {
      //             this.collections.push(collections[i]);
      //             console.log(this.collections);
      //         }
      //     }
      // });
   }

  ngOnInit() {
  }

}
