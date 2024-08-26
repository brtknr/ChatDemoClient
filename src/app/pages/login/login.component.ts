import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { UserSignup } from 'src/app/models/UserSignup';
import { appSettings } from 'src/app/consts';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit{

  @ViewChild('LoginForm') form: NgForm;

  constructor(private _router : Router,private _authService : AuthService,private ngxSpinner : NgxSpinnerService) {

  }

  ngOnInit(): void {
  }


  async login(userLoginForm:NgForm){

    var userVM : UserSignup = {UserName : userLoginForm.value["UserName"],
      Email : userLoginForm.value["Email"],
      Password : userLoginForm.value["Password"]}

    this.ngxSpinner.show();  

    await this._authService.login(userVM).then((response) => console.log(response)).finally(() => this.ngxSpinner.hide());
    

    this._authService.authenticated() ? this._router.navigate([""]) : 
                                          this.form.form.patchValue({
                                          UserName: userVM.UserName,
                                          Email: userVM.Email,
                                          Password: userVM.Password,
                                        }) 
  }

}


