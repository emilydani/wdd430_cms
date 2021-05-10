import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
  @Output() selectedDocumentEvent = new EventEmitter<Document>();

  documents : Document[] = [
    new Document('id1','Name1', 'Description1', 'url1', null),
    new Document('id2','Name2', 'Description2', 'url2', null)
  ];

  constructor() { }

  ngOnInit(): void {
  }
  onSelectedDocument(document: Document){
    this.selectedDocumentEvent.emit(document);
  }

}
