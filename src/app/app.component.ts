import { Component, OnInit } from '@angular/core';
import { FirestoreDataService } from "./firestore-data.service";
import { Hero } from "./heroes";
import {
  faTrash
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title: string = 'Avatar';
  faTrash = faTrash;

  arr: Hero[] = [];
  model = { name: '', element: '', gender: '' };
  ngOnInit() {
    this._data.getHeroes().subscribe((hero: Hero[]) => {
      this.arr = hero;
      console.log(this.arr);
    });
  }
  constructor(public _data: FirestoreDataService) {}
  heroSubmit() {
    this._data.addUser(this.model);
    this.model.name = '';
    this.model.element = '';
    this.model.gender = '';
  }
  onDelete(hero) {
    this._data.deleteUser(hero);
  }
}  
