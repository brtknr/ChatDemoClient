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
      .then(() => console.log("connection started . id : " + this.hubConnection.connectionId))
      .catch(err => console.log('error while starting connection ' + err));
  }

  public dataListener = () => {
    return new Observable((observer) => {
      this.hubConnection.on('RecieveMessage', (data:string) => {
          observer.next(data);
          });
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

  async sendMessageAsync(msg,targetConnectionId){
    await this.hubConnection.invoke("ClientToClientSendMessage",msg,targetConnectionId);
  }

}
