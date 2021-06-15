import { Injectable, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { Document } from './document.model';
// import { MOCKDOCUMENTS } from './MOCKDOCUMENTS'
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  @Output() documentListChangedEvent = new Subject<Document[]>();

  private documents: Document[] = [];
  maxDocumentId: number;

  constructor(private http: HttpClient) {
    this.getDocuments();
  }

  getDocuments() {
    this.http
      .get<Document[]>(
        'https://cms-430-default-rtdb.firebaseio.com/documents.json'
      )
      .subscribe(
        (documents: Document[]) => {
          this.documents = documents;
          this.maxDocumentId = this.getMaxId();
          this.documents.sort((a, b) => {
            if (a.name < b.name) {
              return -1;
            }
            if (a.name > b.name) {
              return 1;
            }
            return 0;
          });
          this.documentListChangedEvent.next(this.documents.slice());
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  storeDocuments() {
    let documents = JSON.stringify(this.documents);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    this.http
      .put(
        'https://cms-430-default-rtdb.firebaseio.com/documents.json',
        documents,
        { headers: headers }
      )
      .subscribe(() => {
        this.documentListChangedEvent.next(this.documents.slice());
      });
  }

  getDocument(id: string) {
    for (let document of this.documents) {
      if (document.id === id) {
        return document;
      }
    }
    return null;
  }

  getMaxId(): number {
    let maxId: number = 0;
    for (let document of this.documents) {
      let currentId: number = +document.id;
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  addDocument(newDocument: Document) {
    if (!newDocument) {
      return;
    }
    this.maxDocumentId++;
    newDocument.id = this.maxDocumentId.toString();
    this.documents.push(newDocument);
    this.storeDocuments();
  }
  updateDocument(originalDocument: Document, newDocument: Document) {
    if (!originalDocument || !newDocument) {
      return;
    }
    let pos = this.documents.indexOf(originalDocument);
    if (pos < 0) {
      return;
    }
    newDocument.id = originalDocument.id;
    this.documents[pos] = newDocument;
    this.storeDocuments();
  }

  deleteDocument(document: Document) {
    if (!document) {
      return;
    }

    const pos = this.documents.indexOf(document);
    if (pos < 0) {
      return;
    }

    this.documents.splice(pos, 1);
    this.storeDocuments();
  }
}
