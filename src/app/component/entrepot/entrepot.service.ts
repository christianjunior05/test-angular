import { Injectable } from '@angular/core';
import { Entrepot } from '../../model/entrepot.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EntrepotService {

  constructor(private afs: AngularFirestore) { }

  // add entrepôt
  addEntrepot(entrepot: Entrepot) {
    entrepot.id = this.afs.createId();
    return this.afs.collection('/Entrepot').add(entrepot);
  }

  // get all entrepôts
  getAllEntrepot() {
    return this.afs.collection('/Entrepot').snapshotChanges();
  }

  // delete entrepôt
  deleteEntrepot(entrepot: Entrepot) {
    this.afs.doc('/Entrepot/' + entrepot.id).delete();
  }

  // update entrepôt
// EntrepotService
  updateEntrepot(entrepot: Entrepot): Promise<void> {
    const entrepotId = entrepot.id;
    return this.afs.doc('/Entrepot/' + entrepotId).update(entrepot);
  }


  find(id: string): Observable<Entrepot | undefined> {
    return this.afs.doc<Entrepot>('/Entrepot/' + id).valueChanges();
  }
}
