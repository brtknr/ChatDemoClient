import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, inject, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserSignup } from 'src/app/models/UserSignup';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  
  private _httpClient = inject(HttpClient);
  private baseUrl = "https://localhost:7155/User";

  @ViewChild('signUpForm') form: any;
  errors : [] = [];
  test : string = "";

  signup(userSignUpForm : NgForm){
    console.log(userSignUpForm.value);
    var userVM : UserSignup = {UserName : userSignUpForm.value["UserName"],
                               Email : userSignUpForm.value["Email"],
                               Password : userSignUpForm.value["Password"]}

    this.form.reset();
    this._httpClient.post(`${this.baseUrl}/SignUp`,userVM).subscribe({
        next(value) {
        },
        error(err : HttpErrorResponse) {

          console.log(err);
          this.errors = parseErrors(err);
          this.test = "asd";
          console.log(this.errors);
        },
      }
    )
  }

}
function parseErrors(response: any) {
  var errors = [];
  for (var key in response.error.errors) {
      for (var i = 0; i < response.error.errors[key].length; i++) {
          errors.push(response.error.errors[key][i]);
      }
  }
  return errors;
}

