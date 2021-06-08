import { Component, OnInit, EventEmitter, Output} from '@angular/core';
import { Subscription } from 'rxjs';
import { Contact } from '../contact.model'
import { ContactService } from '../contact.service';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  contacts: Contact[];
  private subscription: Subscription;

  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    this.contacts = this.contactService.getContacts();
    this.subscription = this.contactService.contactListChangedEvent
      .subscribe(
        (contacts: Contact[]) => {
          this.contacts = contacts;
          console.log(contacts);
        }
      )

  }

  onSelected(contact: Contact){
    this.contactService.contactSelectedEvent.emit(contact);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
