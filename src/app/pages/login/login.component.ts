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

  @ViewChild('LoginForm') form: NgForm;

  constructor(private _router : Router,private _authService : AuthService) {

  }


  async login(userLoginForm:NgForm){

    var userVM : UserSignup = {UserName : userLoginForm.value["UserName"],
      Email : userLoginForm.value["Email"],
      Password : userLoginForm.value["Password"]}

    var succeeded : boolean;

    await this._authService.login(userVM).then((response) => succeeded = response);
    
    console.log(succeeded);
    

    succeeded ? this._router.navigate([""]) : 
                        this.form.form.patchValue({
                        UserName: userVM.UserName,
                        Email: userVM.Email,
                        Password: userVM.Password,
                        }) 
  }

}


