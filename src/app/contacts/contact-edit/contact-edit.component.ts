import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';


@Component({
  selector: 'cms-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {
  originalContact: Contact;
  contact: Contact;
  groupContacts: Contact[] = [];
  editMode: boolean = false;
  id: string;

  constructor(
    private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe (
      (params: Params) => {
        if (!params.id) {
          this.editMode = false;
          return;
        } else {
          this.originalContact = this.contactService.getContact(params.id);
          if (!this.originalContact) {
            return
          }
          this.editMode = true;
          this.contact = JSON.parse(JSON.stringify(this.originalContact));
          if (this.contact.group) {
            this.groupContacts = this.contact.group;
          }
        }
      }
    )
  }

  onSubmit(form: NgForm) {
    let value = form.value;
    let newContact = new Contact(null, value.name, value.email, value.phone, value.imageUrl, null);
    if(this.editMode) {
      this.contactService.updateContact(this.originalContact, newContact)
    } else {
      this.contactService.addcontact(newContact);
    }
    this.router.navigate(['/contacts']);
  }

  onCancel() {
    this.router.navigate(['/contacts']);
  }

  // isInvalidContact(newContact: Contact) {
  //   if (!newContact) {// newContact has no value
  //     return true;
  //   }
  //   if (this.contact && newContact.id === this.contact.id) {
  //      return true;
  //   }
  //   for (let i = 0; i < this.groupContacts.length; i++){
  //      if (newContact.id === this.groupContacts[i].id) {
  //        return true;
  //     }
  //   }
  //   return false;
//  }

}
