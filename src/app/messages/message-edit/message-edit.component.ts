import { Component, ElementRef, OnInit, ViewChild, EventEmitter, Output  } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {
  @ViewChild('subject', {static: false}) subjectInputRef: ElementRef;
  @ViewChild('msgText', {static: false}) msgTextInputRef: ElementRef;
  currentSender: string = 'Bob';



  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
  }

  onSendMessage(){
    const subject = this.subjectInputRef.nativeElement.value;
    const msgText = this.msgTextInputRef.nativeElement.value;
    const newMessage = new Message('-1', subject, msgText, this.currentSender);
    this.messageService.addMessage(newMessage)
  }

  onClear(){
    this.subjectInputRef.nativeElement.value = '';
    this.msgTextInputRef.nativeElement.value ='';
  }

}
