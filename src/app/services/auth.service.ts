import { HttpClient } from '@angular/common/http';
import { TmplAstRecursiveVisitor } from '@angular/compiler';
import { inject, Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserSignup } from '../models/UserSignup';
import { appSettings } from '../consts';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _httpClient = inject(HttpClient);

  constructor() { }

  private auth = false;

  authenticated(){
    return this.auth;
  }

  async login(userVM:UserSignup) {
    this._httpClient.post(`${appSettings.USER_BASE_URL}/Login`,userVM).subscribe({
      next(value) 
      {
        console.log(value);
      },
      error(err) {
        console.log(err);
      },
    
    });
  }

}
