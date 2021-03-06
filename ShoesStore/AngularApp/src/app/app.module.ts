import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { ShoesComponent } from './components/shoes/shoes.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SignupComponent } from './components/signup/signup.component';
import { CartComponent } from './components/cart/cart.component';
import { HistoryComponent } from './components/history/history.component';
import { AdminComponent } from './components/admin/admin.component';
import { CreateshoesComponent } from './components/createshoes/createshoes.component';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { EditshoesComponent } from './components/editshoes/editshoes.component';


import { SocialLoginModule, AuthServiceConfig, GoogleLoginProvider,
  FacebookLoginProvider,
  AuthService} from 'ng-social-login-module';
import { AuthGuard } from './services/auth.guard';
import { UpdateshoesComponent } from './components/updateshoes/updateshoes.component';
const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('595791710812-b26iddsr8lsqntdqrs6cpmpllq65obfd.apps.googleusercontent.com')
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider('465730364148971')
  }
], false);

export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    ShoesComponent,
    ProfileComponent,
    SignupComponent,
    CartComponent,
    HistoryComponent,
    AdminComponent,
    CreateshoesComponent,
    EditshoesComponent,
    UpdateshoesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    SocialLoginModule
  ],
  providers: [
    { provide: AuthServiceConfig, useFactory: provideConfig },
    AuthService, AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
