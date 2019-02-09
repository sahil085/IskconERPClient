import { BrowserModule } from '@angular/platform-browser';
import {Injectable, NgModule} from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import {AuthService} from './service/auth.service';
import {HTTP_INTERCEPTORS, HttpClientModule, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import { HomeComponent } from './components/adminComponent/home/home.component';
import {AuthGuard} from './security/auth.guard';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { UserAddressComponent } from './components/adminComponent/addressModule/user-address/user-address.component';
import { NgxLoadingModule } from 'ngx-loading';
import { NgSelectModule } from '@ng-select/ng-select';
import { AddressListComponent } from './components/adminComponent/addressModule/address-list/address-list.component';
import { UserInfoComponent } from './components/adminComponent/addressModule/user-info/user-info.component';
import { AgmCoreModule } from '@agm/core';
import { RathYatraLocationComponent } from './components/rath-yatra-location/rath-yatra-location.component';
const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'userAddressDetail', component: UserAddressComponent},
  {path: 'addressList', component: AddressListComponent},
  {path: 'rathYatra', component:RathYatraLocationComponent}

];

@Injectable()
export class XhrInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (localStorage.getItem('Authorization') == null) {
      console.log(localStorage.getItem('Authorization'));
      const xhr = req.clone({
        setHeaders: {
          'X-Requested-With' : 'XMLHttpRequest'
        }
      });
      return next.handle(xhr);
    } else {
      const xhr = req.clone({
        setHeaders: {
          'X-Requested-With' : 'XMLHttpRequest',
          'Authorization' : 'Basic ' + localStorage.getItem('Authorization')
        }
      });
      return next.handle(xhr);
    }
  }
}


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SideNavComponent,
    HomeComponent,
    LoginComponent,
    UserAddressComponent,
    AddressListComponent,
    UserInfoComponent,
    RathYatraLocationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpModule,
    BrowserAnimationsModule,
    NgSelectModule,
    NgxLoadingModule.forRoot({}),
    RouterModule.forRoot(appRoutes),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDbYVVlZjoCSDJo7c2sqPxgPomabDPI0G0'
    })
  ],
  exports: [RouterModule],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: XhrInterceptor,
    multi: true
  }, AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
