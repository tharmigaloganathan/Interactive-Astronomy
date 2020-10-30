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
    //VARIABLE DECLARATIONS
    private images: any;

    constructor(private _imageService:ImageService, private router: Router) {
    }

    //RETRIVES DATA FROM THE API (USING IMAGESERVICE)
    getData(_searchQuery: string) {
        this.images = this._imageService.searchImages(_searchQuery);
    }

    //ADDS IMAGE URL TO LOCAL STORAGE AND REDIRECTS USER
    addImageToLocalStorage(_imageURL : number) {
        localStorage.setItem(ITEM_NAME, _imageURL.toString());
        this.router.navigate(['./add-image']);
    }

    //CLEANS ALL OF THE DATA THAT COMES IN BUT GETTING RID OF INCONSISTENCIES IN API OUTPUT FORMAT
    cleanData() {
        for(var i = 0; i< this.images.length;i++) {
            this.images[i] = this.images[i].links[0].href;
            console.log(this.images[i]);
        }
    }

    ngOnInit() {}

}
