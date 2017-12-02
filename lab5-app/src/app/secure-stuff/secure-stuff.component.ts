import { Component, OnInit } from '@angular/core';
import { AuthHttp, tokenNotExpired } from 'angular2-jwt';
import 'rxjs/add/operator/map';

@Component({
    selector: 'app-secure-stuff',
    templateUrl: './secure-stuff.component.html',
    styleUrls: ['./secure-stuff.component.css']
})
export class SecureStuffComponent implements OnInit {

    private stuff: any[];
    private url: string = 'http://localhost:8080/api/';

    constructor(private authHttp: AuthHttp) { }

    ngOnInit() {
    }


    getSecureStuff() {
        this.authHttp.get(`${this.url}/auth`)
        .map(res => res.json())
        .subscribe(
            data =>  this.stuff = data.stuff,
            error => console.log(error)
        );
    }

}
