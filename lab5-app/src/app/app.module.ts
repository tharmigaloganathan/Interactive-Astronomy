import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
import { AddCollectionComponent } from './add-collection/add-collection.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'main',       component: MainComponent },
  { path: '',       component: MainComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthenticateGuard] },
  { path: 'add-image', component: AddImageComponent },
  { path: 'add-collection', component: AddCollectionComponent }
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
    AddImageComponent,
    AddCollectionComponent,
    UserProfileComponent
  ],
  imports: [
    RouterModule.forRoot( appRoutes, { enableTracing: true }),
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HttpModule
  ],
  providers: [AuthenticateService, HttpClientModule, AuthenticateGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
