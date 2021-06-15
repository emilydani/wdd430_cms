import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Message } from './message.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  @Output() messageSelectedEvent = new Subject<Message[]>();
  @Output() messageListChangedEvent = new Subject<Message[]>();

  private messages: Message[] = [];
  maxMessageId: number;

  constructor(private http: HttpClient) {
    this.getMessages();
  }

  getMessages() {
    this.http
    .get<Message[]>('https://cms-430-default-rtdb.firebaseio.com/messages.json')
    .subscribe(
      //success method
      (messages: Message[]) => {
        this.messages = messages;
        this.maxMessageId = this.getMaxId();
        this.messages.sort((a, b) => {
          if (a.id < b.id) {
            return -1;
          }
          if (a.id > b.id) {
            return 1;
          }
          return 0;
        })
        this.messageListChangedEvent.next(this.messages.slice());
      },
      //error method
      (error: any) => {
        console.log(error);
      });
  }

  getMessage(id: string): Message {
    for (const message of this.messages) {
      if (message.id === id) {
        return message;
      }
    }
    return null;
  }

  storeMessages() {
    let messages = JSON.stringify(this.messages);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    this.http
      .put('https://cms-430-default-rtdb.firebaseio.com/messages.json', messages, {
        headers: headers,
      })
      .subscribe(() => {
        this.messageListChangedEvent.next(this.messages.slice());
      });
  }

  getMaxId() {
    let maxId: number = 0;
    for (let message of this.messages) {
      let currentId: number = +message.id;
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  addMessage(message: Message) {
    message.id = (this.getMaxId() + 1).toString();
    this.messages.push(message);
    this.storeMessages();
  }
}
