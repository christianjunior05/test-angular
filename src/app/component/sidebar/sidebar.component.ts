import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import firebase from "firebase/compat";
import User = firebase.User;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  currentUser: User | null;
  userEmail: string | null;

  constructor(private auth: AngularFireAuth) {
    this.currentUser = null;
    this.userEmail = null;
  }

  ngOnInit(): void {
    // Abonnez-vous aux changements d'état d'authentification
    this.auth.authState.subscribe((user: User | null) => {
      this.currentUser = user;
      if (user) {
        this.userEmail = user.email;
      } else {
        this.userEmail = null;
      }
    });
  }
}
