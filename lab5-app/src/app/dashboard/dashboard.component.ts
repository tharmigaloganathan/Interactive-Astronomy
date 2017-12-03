import { Component, OnInit } from '@angular/core';
import { ImageService } from "../image.service";
import { Router} from "@angular/router";

export const ITEM_NAME: string = 'image_url';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [ImageService]
})
export class DashboardComponent implements OnInit {

    private images: any;
    

  constructor(private _imageService:ImageService, private router: Router) {
  }

  getData(_searchQuery: string) {
      this.images = this._imageService.searchImages(_searchQuery);
      console.log(this.images);
  }

  addImageToLocalStorage(_imageURL : number) {
      // console.log(this.images[i]);
      localStorage.setItem(ITEM_NAME, _imageURL);
      this.router.navigate(['./add-image']);
  }

  cleanData() {
      for(var i = 0; i< this.images.length;i++) {
          this.images[i] = this.images[i].links[0].href;
          console.log(this.images[i]);
      }
  }

  ngOnInit() {
  }


}
