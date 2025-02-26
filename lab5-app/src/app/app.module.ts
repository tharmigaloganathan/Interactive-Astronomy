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
import { AddImageComponent } from './add-image/add-image.component';
import { AddCollectionComponent } from './add-collection/add-collection.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { BrowseCollectionsComponent } from './browse-collections/browse-collections.component';
import { ViewCollectionComponent } from './view-collection/view-collection.component';
import { EditCollectionComponent } from './edit-collection/edit-collection.component';
import { CreateNewAccountComponent } from './create-new-account/create-new-account.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'main',       component: MainComponent },
  { path: '',       component: MainComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthenticateGuard] },
  { path: 'browse-collections', component: BrowseCollectionsComponent },
  { path: 'add-image', component: AddImageComponent, canActivate: [AuthenticateGuard]  },
  { path: 'user-profile', component: UserProfileComponent, canActivate: [AuthenticateGuard]  },
  { path: 'add-collection', component: AddCollectionComponent, canActivate: [AuthenticateGuard]  },
  { path: 'view-collection', component: ViewCollectionComponent },
  { path: 'edit-collection', component: EditCollectionComponent, canActivate: [AuthenticateGuard]  },
  { path: 'new-account', component: CreateNewAccountComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    DashboardComponent,
    AddImageComponent,
    AddCollectionComponent,
    UserProfileComponent,
    BrowseCollectionsComponent,
    ViewCollectionComponent,
    EditCollectionComponent,
    CreateNewAccountComponent
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
