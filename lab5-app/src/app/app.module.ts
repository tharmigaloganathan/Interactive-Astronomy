import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthenticateService } from './authenticate.service'

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'main',      component: MainComponent },
  // {
  //   path: 'heroes',
  //   component: HeroListComponent,
  //   data: { title: 'Heroes List' }
  // },
  // { path: '',
  //   redirectTo: '/main',
  //   pathMatch: 'full'
  // },
  // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    DashboardComponent
  ],
  imports: [
    RouterModule.forRoot( appRoutes, { enableTracing: true }),
    BrowserModule,
    HttpClientModule,
    HttpModule
  ],
  providers: [AuthenticateService, HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
