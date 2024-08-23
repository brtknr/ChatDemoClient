import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './pages/main/main.component';
import { ComponentsModule } from './components/components.module';
import { SignalrService } from './services/signalr.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'; 
import { FormsModule } from '@angular/forms';
import { SignupComponent } from './pages/signup/signup.component';
import { AuthService } from './services/auth.service';
import { LoginComponent } from './pages/login/login.component';
import { AuthInterceptor } from './interceptors/authInterceptor';
import { JWT_OPTIONS, JwtHelperService, JwtModule } from '@auth0/angular-jwt';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    SignupComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ComponentsModule,
    HttpClientModule,
    FormsModule,
    JwtModule.forRoot({
      config:{
        tokenGetter: () => {
          console.log("token getter -- ",localStorage.getItem("token"));
          return localStorage.getItem("token");
        },
        allowedDomains:[
            "localhost:7155",
        ] 
      }
    }),
  ],
  providers: [
    SignalrService,
    AuthService,
    JwtHelperService,
    {
    provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true,
    },
    {
      provide: JWT_OPTIONS, useValue: JWT_OPTIONS,
    }
],
bootstrap: [AppComponent]
})
export class AppModule { }
