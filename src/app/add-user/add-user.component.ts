import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  errorMessage: string = '';
  addUserForm: FormGroup;
  imageUploadPercent: number = 0;
  downloadURL: string | null = null;

  constructor(
    private router: Router,
    private fire: AngularFireAuth,
    private db: AngularFireDatabase,
    private storage: AngularFireStorage,
    private formBuilder: FormBuilder
  ) {
    this.addUserForm = this.formBuilder.group({
      firstname: ['', [Validators.required, Validators.pattern("[A-Za-z ]+"), Validators.minLength(3)]],
      lastname: ['', [Validators.required, Validators.pattern("[A-Za-z ]+"), Validators.minLength(3)]],
      Cin: ['', [Validators.required, Validators.pattern("[0-9]+"), Validators.minLength(3)]],
      phonenumber: ['', [Validators.required, Validators.pattern("[0-9]+"), Validators.minLength(8), Validators.maxLength(13)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      imageFile: [''] // Champ pour contenir le fichier image
    });
  }

  ngOnInit(): void {}

  onImageChange(event: any) {
    const file = event.target.files[0];
   
    // Mise à jour du formulaire avec le fichier sélectionné
    this.addUserForm.patchValue({
       imageFile: file
    });
   
    // Déclencher la validation et la mise à jour de la valeur pour le contrôle 'imageFile'
    this.addUserForm.get('imageFile')?.updateValueAndValidity();
   }

   onSubmit() {
    if (this.addUserForm.valid) {
      const { email, password, imageFile, firstname, ...userData } = this.addUserForm.value;
  
      // Create the user with email and password
      this.fire.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          const userId = userCredential.user?.uid;
          const fileName = `${userId}.jpg`;
          const filePath = `user_images/${fileName}`;
          const storageRef = this.storage.ref(filePath);
          const uploadTask = this.storage.upload(filePath, imageFile);
  
          uploadTask.snapshotChanges().pipe(
            finalize(() => {
              storageRef.getDownloadURL().subscribe((downloadURL) => {
                // Convert "presence" to an array and add the current date
                const currentDate = formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss', 'en-US');
                const presenceArray = [{ date: currentDate }];
  
                const user = {
                  ...userData,
                  firstname,
                  image: downloadURL,
                  UserId: userId,
                  presence: presenceArray // Use the array for presence
                };
  
                this.db.list('users').push(user).then(() => {
                  this.router.navigate(['/users']);
                }).catch(error => {
                  console.error(error);
                  this.errorMessage = error.message;
                });
              });
            })
          ).subscribe();
        })
        .catch(error => {
          console.error(error);
          this.errorMessage = error.message;
        });
    }
  }
  
}