import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';



import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { AngularFireModule } from '@angular/fire/compat'
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from '../environments/environment';
import { UsersComponent } from './users/users.component';
import { RegisterComponent } from './register/register.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AddUserComponent } from './add-user/add-user.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { FinalComponent } from './final/final.component';
import { SocieteComponent } from './societe/societe.component';
import { UserPresenceComponent } from './user-presence/user-presence.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UsersComponent,
    RegisterComponent,
    ResetpasswordComponent,
    AddUserComponent,
    UpdateUserComponent,
    ConfirmationDialogComponent,
    FinalComponent,
    SocieteComponent,
    UserPresenceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    ReactiveFormsModule,
    MatDialogModule,
    CommonModule


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
