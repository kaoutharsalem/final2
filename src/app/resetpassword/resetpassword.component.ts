import { Component,OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {
  email!: string;
  errorMessage!: string;
  constructor(private authservice: AuthService, private router: Router) { }

  ngOnInit(): void {
  }
  resetPassword(email: string) {

    this.authservice.resetPassword(email).then(
      () => {
        this.router.navigate(['/']);
      },
      (error) => {
        this.errorMessage = error

      }
    )

  }

}
