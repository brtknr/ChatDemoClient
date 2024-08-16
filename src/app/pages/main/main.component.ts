import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { SignalrService } from 'src/app/services/signalr.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  inputText:any = "";
  userJoined:string;
  userLeft:string;

  clientlist:string[] = [];


  constructor(private _signalrService : SignalrService,private _http:HttpClient) {}

  async ngOnInit(){
    this._signalrService.startConnection();
    this._signalrService.dataListener().subscribe((data=>{
      this.inputText = data;
    }));

    this._signalrService.clientList().subscribe((data:string[]) => {
      //this.clientlist = [];
      this.clientlist = data;
      // data.forEach(element => {
      //   this.clientlist.push(element);
      // });
    })
    
    this._signalrService.userJoined().subscribe((data:string) => {
      this.userJoined = data;
    });

    this._signalrService.userLeft().subscribe((data:string) => {
      this.userLeft = data;
    });
  }

  sendMessage(inputElement:HTMLInputElement,connIdInput:HTMLInputElement){
    // console.log(inputElement.value);
    this._signalrService.sendMessageAsync(inputElement.value,connIdInput.value);
  }

}
