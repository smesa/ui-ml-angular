import { Injectable } from '@angular/core';
import {
  Action,
  AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentChangeAction, DocumentChangeType, DocumentSnapshotDoesNotExist, DocumentSnapshotExists
} from '@angular/fire/firestore';

import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

type CollectionPredate<Type> = string | AngularFirestoreCollection<Type>;
type DocPredicate<Type> = string | AngularFirestoreDocument<Type>;

@Injectable({
  providedIn: 'root'
})
export class FirestoreOperationsService {

  constructor(
    private afs: AngularFirestore
  ) { }

  get timestamp(): any {
    return firebase.default.firestore.FieldValue.serverTimestamp();
  }

  col<Type>(ref: CollectionPredate<Type>, queryFn?): AngularFirestoreCollection<Type> {
    return typeof ref === 'string' ? this.afs.collection<Type>(ref, queryFn) : ref;
  }

  doc<Type>(ref: DocPredicate<Type>): AngularFirestoreDocument<Type> {
    return typeof ref === 'string' ? this.afs.doc<Type>(ref) : ref;
  }

  doc$<Type>(ref: DocPredicate<Type>): Observable<Type> {
    return this.doc(ref)
      .snapshotChanges()
      .pipe(
        map(
          (doc: Action<DocumentSnapshotDoesNotExist | DocumentSnapshotExists<Type>>) => {
            return doc.payload.data() as Type
          }
        )
      );
  }

  col$<Type>(ref: CollectionPredate<Type>, queryFn?): Observable<Type[]> {
    return this.col(ref, queryFn)
      .snapshotChanges()
      .pipe(
        map((docs: DocumentChangeAction<Type>[]) => {
          return docs.map((doc: DocumentChangeAction<Type>) => doc.payload.doc.data()) as Type[];
        }),
      );
  }

  colWithIds$<Type>(ref: CollectionPredate<Type>, queryFn?): Observable<any[]> {
    return this.col(ref, queryFn)
      .snapshotChanges()
        .pipe(
          map((docs: DocumentChangeAction<Type>[]) => {
            return docs.map(
              (doc: DocumentChangeAction<Type>) => {
                const data: Object = doc.payload.doc.data() as Type;
                const id: any = doc.payload.doc.id;
                return { id, ...data }
              }
            )
          }),
        );
  }

  add<Type>(ref: CollectionPredate<Type>, data: any): Promise<firebase.default.firestore.DocumentReference> {
    const timestamp = this.timestamp;
    return this.col(ref).add({
      ...data,
      updatedAt: timestamp,
      createdAt: timestamp
    })
  }

  set<Type>(ref: DocPredicate<Type>, data: any): Promise<void> {

    const timestamp = this.timestamp;
    return this.doc(ref).set({
      ...data,
      updatedAt: timestamp,
      createdAt: timestamp
    })
  }

  update<Type>(ref: DocPredicate<Type>, data: any): Promise<void> {
    return this.doc(ref).update({
      ...data,
      updatedAt: this.timestamp
    })
  }

  delete<Type>(ref: DocPredicate<Type>): Promise<void> {
    return this.doc(ref).delete();
  }

}
