import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { Hero } from "./heroes";

@Injectable({
  providedIn: 'root'
})
export class FirestoreDataService {

  heroesCollection: AngularFirestoreCollection<Hero>;
  heroes: Observable<Hero[]>;
  heroDoc: AngularFirestoreDocument<Hero>;
  constructor(public _afs: AngularFirestore) {

    this.heroesCollection = this._afs.collection('Heroes', x => x.orderBy('name', 'asc'));
    this.heroes = this.heroesCollection.snapshotChanges().pipe(map(
      changes => {
        return changes.map(
          a => {
            const data = a.payload.doc.data() as Hero;
            data.id = a.payload.doc.id;
            return data;
          });
      }));
  }
  getHeroes() {
    return this.heroes;
  }
  addUser(hero) {
    this.heroesCollection.add(hero);
  }
  deleteUser(hero) {
    this.heroDoc = this._afs.doc(`Heroes/${hero.id}`);
    this.heroDoc.delete();
  }  
}
