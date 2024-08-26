import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { SignalrService } from 'src/app/services/signalr.service';
import { ChatGroupModel } from 'src/app/models/ChatGroupModel';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatListItem } from '@angular/material/list';

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

  chatGroups:ChatGroupModel[] = [
     {id:1,title:"Group A",avatarUrl:"./assets/GroupAvatars/droplet.jpeg",groupAdmin:"",lastMessage:"Saaaa tesdst message111",messages:[],members:[],seen:false,memberCount:11},
     {id:2,title:"Group B",avatarUrl:"./assets/GroupAvatars/football.jpg",groupAdmin:"",lastMessage:"Groupppp BBBB",messages:[],members:[],seen:true,memberCount:3},
     {id:3,title:"Group C",avatarUrl:"./assets/GroupAvatars/green.jpg",groupAdmin:"",lastMessage:"sdf message from sddsff",messages:[],members:[],seen:true,memberCount:8},
     {id:4,title:"Group D",avatarUrl:"./assets/GroupAvatars/droplet.jpeg",groupAdmin:"",lastMessage:"dsf mesdfssage from asdasd",messages:[],members:[],seen:true,memberCount:8},
     {id:5,title:"Group E",avatarUrl:"./assets/GroupAvatars/football.jpg",groupAdmin:"",lastMessage:"sdf message from dsasdasd",messages:[],members:[],seen:true,memberCount:8},
     {id:6,title:"Group F",avatarUrl:"./assets/GroupAvatars/green.jpg",groupAdmin:"",lastMessage:"sdf message ssdfdsdfrom fasdasd",messages:[],members:[],seen:true,memberCount:8},
     {id:7,title:"Group G",avatarUrl:"./assets/GroupAvatars/football.jpg",groupAdmin:"",lastMessage:"Hiiiiiiiiiii message from asdasd",messages:[],members:[],seen:true,memberCount:8},
  ];

  drawerContent:ChatGroupModel;

  constructor(private _signalrService : SignalrService,private _http:HttpClient,private ngxSpinner:NgxSpinnerService) {}

  async ngOnInit(){

    this._signalrService.startConnection();
    this._signalrService.dataListener().subscribe((data=>{
      this.inputText = data;
    }));

    this._signalrService.clientList().subscribe((data:string[]) => {
      this.clientlist = data;      
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

  onChatGroupClick(groupId:number){
  
    this.chatGroups.forEach(element => {
        if(element.id == groupId) this.drawerContent = element;
    });
  }

  testAuth(){
    this._http.get("https://localhost:7155/User/AuthTest").subscribe({
      next(value) {
        console.log(value);
      },
      error(err) {
        console.log(err);
      },
    });
  }

}
