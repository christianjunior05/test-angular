import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import {Entrepot} from "../model/entrepot.model";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private afs : AngularFirestore, private fireStorage : AngularFireStorage) { }


  // add student
  addEntrepot(entrepot : Entrepot) {
    entrepot.id = this.afs.createId();
    return this.afs.collection('/Entrepot').add(entrepot);
  }

  // get all students
  getAllEntrepot() {
    return this.afs.collection('/Entrepot').snapshotChanges();
  }

  // delete student
  deleteEntrepot(entrepot : Entrepot) {
    this.afs.doc('/Entrepot/'+entrepot.id).delete();
  }

  // update student
  updateEntrepot(entrepot : Entrepot) {
    this.deleteEntrepot(entrepot);
    this.addEntrepot(entrepot);
  }

}
