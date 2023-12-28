import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userList: AngularFireList<User>; // Specify the type as User here

  constructor(private db: AngularFireDatabase) {
    this.userList = db.list('users');
  }

  addUser(user: User): void {
    // Implement the logic to add a user
  }

  createUser(user: User): void {
    this.userList.push(user)
      .then(() => console.log('User added successfully'))
      .catch(error => console.error(error));
  }

  getUsers(): Observable<any[]> {
    return this.userList.snapshotChanges();
  }

  getUserById(id: any): Observable<any[]> {
    return this.db.list('users', ref => ref.orderByKey().equalTo(id)).snapshotChanges();
  }
}
