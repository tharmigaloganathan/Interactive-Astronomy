import { Component, OnInit } from '@angular/core';
import { ImageService } from "../image.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [ImageService]
})
export class DashboardComponent implements OnInit {

    private images: any;

  constructor(private _imageService:ImageService) {
  }

  getData(_searchQuery: string) {
      this.images = this._imageService.searchImages(_searchQuery);
      console.log(this.images);
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
