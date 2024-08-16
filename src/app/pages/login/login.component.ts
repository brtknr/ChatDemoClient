import { HttpClient } from '@angular/common/http';
import { Component, inject, ViewChild } from '@angular/core';
import { UserSignup } from 'src/app/models/UserSignup';
import { appSettings } from 'src/app/consts';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  private _authService = inject(AuthService);

  @ViewChild('LoginForm') form: NgForm;

  async login(userLoginForm:NgForm){

    var userVM : UserSignup = {UserName : userLoginForm.value["UserName"],
      Email : userLoginForm.value["Email"],
      Password : userLoginForm.value["Password"]}

    await this._authService.login(userVM);

    console.log(this._authService.authenticated());
    

    this._authService.authenticated() ? inject(Router).createUrlTree(['/']) : 
                                          this.form.form.patchValue({
                                            UserName: userVM.UserName,
                                            Email: userVM.Email,
                                            Password: userVM.Password,
                                          }) 
  }

}


