import {Injectable} from '@angular/core';
import {Entrepot} from '../../model/entrepot.model';
import {HttpClient} from "@angular/common/http";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EntrepotService {

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
  updateEntrepot(entrepot: Entrepot) {
    const entrepotId = entrepot.id;
    delete entrepot.id; // Supprimer l'ID pour éviter de le mettre à jour dans le document
    this.afs.doc('/Entrepot/' + entrepotId).set(entrepot);
  }

  find(id: string): Observable<Entrepot | undefined> {
    return this.afs.doc<Entrepot>('/Entrepot/' + id).valueChanges();
  }
}
