import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

@Injectable()
export class ImageService {

    private url: string = 'https://images-api.nasa.gov/';
    private data: any[];

    constructor(private _http:Http) { }

    private extractData(res:Response) {
        let body = res.json();
        console.log(body);
        if(body.collection.items != null) {
            for(var i = 0; i < body.collection.items.length; i++) {
                if(body.collection.items[i].links != null)
                    body.collection.items[i] = body.collection.items[i].links[0].href;
            }
            this.data = body.collection.items;
            console.log(body.collection.items);
            return body.collection.items;
        }
        return null;
    }

    getRequest(_url: string): any[] {
        return this._http.get(_url)
        .map(this.extractData);
    }

    getImages(_url: string) {
        setTimeout(
            () => this.getRequest(_url).subscribe(data => this.data = data),
            10);
        return this.data;
    }

    searchImages(_queryParam: string): any[] {
        _queryParam = "search?q=" + _queryParam.replace(/ /g, "%20");
        console.log(_queryParam);

        setTimeout(
            () => console.log(this.getImages(this.url + _queryParam)),
            10);

        return this.data;
    }

}
