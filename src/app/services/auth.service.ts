import { HttpClient } from '@angular/common/http';
import { TmplAstRecursiveVisitor } from '@angular/compiler';
import { inject, Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserSignup } from '../models/UserSignup';
import { appSettings } from '../consts';
import { firstValueFrom, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _httpClient : HttpClient;

  constructor() {
    this._httpClient  = inject(HttpClient);
   }

  private auth = true;

  authenticated(){
    return this.auth;
  }

  async login(userVM:UserSignup) {

    var auth2 = false;

    await firstValueFrom(this._httpClient.post(`${appSettings.USER_BASE_URL}/Login`,userVM))
                .then((value) => auth2 = true)
                .catch((err) =>console.log(err));

    return auth2;            
  }

}
