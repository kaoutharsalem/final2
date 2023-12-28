import { Component, OnInit } from '@angular/core';
import firebase from 'firebase/compat/app';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentUserEmail: string | null = null;

  title = 'final2';
  constructor(private auth: AngularFireAuth){
    var firebaseConfig = {
      apiKey: "AIzaSyCeSkwNJWnAI1WHDUvIvTpYveKA1-FjXR4",
      authDomain: "ptojetangular.firebaseapp.com",
      projectId: "ptojetangular",
      storageBucket: "ptojetangular.appspot.com",
      messagingSenderId: "472162643156",
      appId: "1:472162643156:web:dd9d561c29b41f8f685f41",
      measurementId: "G-N3JQZ6GX7Z"
    };



  
    
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  }
  ngOnInit() {
    this.auth.authState.subscribe((user) => {
      this.currentUserEmail = user ? user.email : null;
    });
  }
}
// ...


  
  
  // ...

