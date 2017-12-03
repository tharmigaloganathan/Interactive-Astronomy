import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthenticateService } from './authenticate.service';

import { AuthenticateGuard } from './authenticate.guard';
import { SecureStuffComponent } from './secure-stuff/secure-stuff.component';
import { AddImageComponent } from './add-image/add-image.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'main',       component: MainComponent },
  { path: '',       component: MainComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthenticateGuard] }
  // { path: 'dashboard', component: DashboardComponent }
  //[AUTHENTICATEGUARD] SHOULD BE APPLIED TO EACH ROUTE THAT SHOULD BE KEPT PRIVATE
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    DashboardComponent,
    SecureStuffComponent,
    AddImageComponent
  ],
  imports: [
    RouterModule.forRoot( appRoutes, { enableTracing: true }),
    BrowserModule,
    HttpClientModule,
    HttpModule
  ],
  providers: [AuthenticateService, HttpClientModule, AuthenticateGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
