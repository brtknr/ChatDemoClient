import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { SignalrService } from 'src/app/services/signalr.service';
import { ChatGroupModel } from 'src/app/models/ChatGroupModel';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { AvatarUrls } from 'src/app/consts';
import { GroupResponseModel } from 'src/app/models/groupResponseModel';
import { MessageResponseModel } from 'src/app/models/messageResponseModel';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  userJoined:string;
  userLeft:string;
  username = localStorage.getItem("username");

  clientlist:string[] = [];
  chatGroups:ChatGroupModel[] = [];
  drawerContent:ChatGroupModel;
  messagesInGroup:MessageResponseModel[] = [];
  
  messagesSubscription : Subscription;

  constructor(private _signalrService : SignalrService,private _http:HttpClient,private ngxSpinner:NgxSpinnerService,private _authService:AuthService,private _router : Router) {}

  async ngOnInit(){

    this._signalrService.startConnection();
    
    this._signalrService.GroupList().subscribe((data:GroupResponseModel[]) => {
      this.chatGroups = [];
      console.log(data);
      data.forEach(element => {
        this.chatGroups.push(
            {
              id : element.groupId,
              title : element.title,
              avatarUrl : element.avatarUrl,
              groupAdmin : element.adminUsername,
              lastMessage : element.lastMessage ,
              members : element.members ?? [],
              seen : false,
              memberCount : element.members?.length,
              createdDate : element.createdDate            
            }
        )
      });

    })
      
  }

  async onChatGroupClick(groupId:number){

    let oldGroupId:string = "0"; // eski group id yok . ilk tiklama

    if(localStorage.getItem("groupid") != 'undefined') oldGroupId = localStorage.getItem("groupid");

    localStorage.setItem("groupid",groupId.toString());


    this.chatGroups.forEach(element => {
      if(element.id == groupId) this.drawerContent = element;
    });

    this._signalrService.invokeGetMessagesByGroupId(oldGroupId,groupId,localStorage.getItem("username"));

    this.messagesInGroup = []; // eski mesajlari temizle
    this.messagesSubscription?.unsubscribe(); // eski baglantiyi bitir.

    this.messagesSubscription = this._signalrService.messagesByGroupId().subscribe((messages : MessageResponseModel[]) =>
                            {
                              console.log(messages);

                            messages.forEach(msg => {
                              this.messagesInGroup.push(
                              {
                                  id : msg.id,
                                  senderUsername : msg.senderUsername,
                                  senderId : "",
                                  text : msg.text,
                                  date : msg.date
                                })
                            });
                          })
     
  }

  createGroup(){
    alert("icon clicked");
  }

  logout(){

    this.ngxSpinner.show();

    this._authService.logout().then((response) => 
      {
        response == true ? this._router.navigate(['/Login']) : console.log("user is not logged out"); 
      })
      .finally(() => this.ngxSpinner.hide());
      
  }

  sendMessageToGroup(htmlElementInput:HTMLInputElement,groupId){
      this._signalrService.sendMessageToGroupAsync(htmlElementInput.value,groupId.toString());
  }


  getStories(){
    console.log("stories!!!");
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
