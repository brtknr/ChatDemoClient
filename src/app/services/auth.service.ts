import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { UserSignup } from '../models/UserSignup';
import { appSettings } from '../consts';
import { firstValueFrom } from 'rxjs';
import { authResponseModel } from '../models/authResponseModel';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _httpClient : HttpClient;

  constructor(private jwtHelper:JwtHelperService) {
    this._httpClient  = inject(HttpClient);
   }

  authenticated(){
    const token = localStorage.getItem("token"); //this.jwtHelper.tokenGetter();
    
    if(token != 'undefined'){
      try{
        console.log(this.jwtHelper.decodeToken(token));
        var isTokenExpired = this.jwtHelper.isTokenExpired(token);
        console.log("is token expired : ",isTokenExpired);
      }
      catch(err){
        console.log("token error : ",err);
        return false;
      }
    }  
    return !isTokenExpired;
  }

  async login(userVM:UserSignup) {

    let succeeded = false;

    await firstValueFrom(this._httpClient.post(`${appSettings.USER_BASE_URL}/Login`,userVM))
                .then((response:authResponseModel) =>
                   {
                    localStorage.setItem("username",response.userName);
                    localStorage.setItem("token",response.token);
                    succeeded = true;
                  })
                .catch((err) =>console.log(err))


    return succeeded;            
  }

  async logout(){
    
    let succeeded = false;
    
    await firstValueFrom(this._httpClient.post(`${appSettings.USER_BASE_URL}/Logout`,""))
                  .then((response:any) => {
                    localStorage.removeItem("token");
                    localStorage.removeItem("username");
                    succeeded = true;
                  })
                  .catch((err) => console.log(err))

    return succeeded;                
  }

}
