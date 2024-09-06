import { Injectable } from '@angular/core';
import * as signalR from "@microsoft/signalr";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {

  private hubConnection : signalR.HubConnection;

  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
                              .withUrl('https://localhost:7155/myhub')
                              .build();
    
    this.hubConnection.start()
      .then(() => this.hubConnection.invoke("matchConnIdAndUser",this.hubConnection.connectionId,localStorage.getItem("username")))
      .catch(err => console.log('error while starting connection ' + err))
      .finally(() => console.log(this.hubConnection.connectionId))
  
  }

  public dataListener = () => {
    return new Observable((observer) => {
      this.hubConnection.on('RecieveMessage', (data:string) => {
          observer.next(data);
          });
    })
  }

  public GroupList = () => {
    return new Observable((observer) => {
      this.hubConnection.on('RecieveGroups',(data:[]) => {
        observer.next(data);
      })
    })
  }

  public clientList = () => {
    return new Observable((observer) => {
      this.hubConnection.on('RecieveClients',(data:string[]) => {
        observer.next(data);
      });
    }) 
  }

  public userJoined = () => {
    return new Observable((observer) => {
      this.hubConnection.on('UserJoined',(data:string[]) => {
        observer.next(data);
      });
    }) 
  }
  
  public userLeft = () => {
    return new Observable((observer) => {
      this.hubConnection.on('UserLeft',(data:string[]) => {
        observer.next(data);
      });
    }) 
  }

  public messagesByGroupId = () => {
    return new Observable((observer) => {
      this.hubConnection.on('RecieveMessagesByGroupId',(data:[]) => 
        {
          console.log('signalr service messages: ',data);
          observer.next(data);
        })
    })
  }

  async sendMessageToGroupAsync(msg,groupId:string){
    await this.hubConnection.invoke("SendMessageToGroup",msg,groupId);
  }

  async invokeGetMessagesByGroupId(oldGroupId:string,groupId:number,username:string){
    await this.hubConnection.invoke("GetMessagesByGroupId",oldGroupId,groupId,username);
  }

}
