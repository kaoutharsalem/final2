import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { MatDialog } from '@angular/material/dialog';
import { FirebaseOperation } from '@angular/fire/compat/database/interfaces';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { User, Presence } from '../user';
import { AngularFireAuth } from '@angular/fire/compat/auth';  

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  userList: AngularFireList<any>;
  currentUserEmail: string | null = null;
  listUsers: User[] = [];
  currentUserUid: string | null = null;
  minDate: string | null = null;
  maxDate: string | null = null;

  constructor(
    private dialog: MatDialog,
    private firebase: AngularFireDatabase,
    private auth: AngularFireAuth
  ) {
    this.userList = firebase.list('users');
  }
  
  ngOnInit(): void {
    this.auth.authState.subscribe((user) => {
      this.currentUserUid = user ? user.uid : null;
      this.getUsers();
    });
  }
  getHoursDifference(presenceArray: Presence[]): string {
    if (presenceArray.length === 0) {
      return '-';
    }
  
    const startDate = new Date(presenceArray[0].date);
    const endDate = new Date(presenceArray[presenceArray.length - 1].date);
  
    const millisecondsDifference = endDate.getTime() - startDate.getTime();
    const secondsDifference = millisecondsDifference / 1000;
  
    const hours = Math.floor(secondsDifference / 3600);
    const minutes = Math.floor((secondsDifference % 3600) / 60);
    const seconds = Math.floor(secondsDifference % 60);
  
    const formattedTime = `${this.padZero(hours)}:${this.padZero(minutes)}:${this.padZero(seconds)}`;
    
    return formattedTime;
  }
  
  private padZero(num: number): string {
    return num < 10 ? `0${num}` : num.toString();
  }
  

  getUsers() {
    this.userList.snapshotChanges().subscribe((results) => {
       this.listUsers = results.map((item) => {
         const user = item.payload.toJSON() as User;
         user.presence = Object.values(user.presence || {}) as Presence[];
         user.$key = item.key ?? '';
   
         // Récupérer les dates minimales et maximales du champ presence
         if (user.presence.length > 0) {
           const dates = user.presence.map((presence: Presence) => new Date(presence.date).getTime());
           const minDateValue = Math.min.apply(null, dates);
           const maxDateValue = Math.max.apply(null, dates);
   
           // Check if the date values are valid before updating the properties
           if (minDateValue >= -8.64e15 && minDateValue <= 8.64e15) {
             this.minDate = new Date(minDateValue).toISOString();
           }
   
           if (maxDateValue >= -8.64e15 && maxDateValue <= 8.64e15) {
             this.maxDate = new Date(maxDateValue).toISOString();
           }
         }
   
         return user;
       });
   
       // If the current user's UID is specific, show all users
       if (this.currentUserUid === '6ukTlRnWQWY9aOsivKG1KrX1mj22') {
         return;
       }
   
       // Filter users based on the current user's UID
       if (this.currentUserUid) {
         this.listUsers = this.listUsers.filter(user => user.UserId === this.currentUserUid);
       }
    
   
   
        
      });
    }
   

  openDialog(key: FirebaseOperation): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: 'Voulez-vous vraiment supprimer ces données?'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userList.remove(key);
      }
    });
  }

  edit(key: string) {
    // Ajoutez le code pour mettre à jour l'utilisateur ici si nécessaire
  }
}
