import { Component, OnInit, Input } from '@angular/core';

// You'll use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// This import brings in the API calls we created in 6.2
import { UserRegistrationService } from '../fetch-api-data.service';

// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

import { Router } from '@angular/router'


@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {

  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  constructor(
    public fetchApiData: UserRegistrationService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  /**
   *  This is the function responsible for sending the form inputs to the backend
   * Tells the user that they have been logged in
   * Then sends them to the movies page
   * @function loginUser
   */

  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe(
      (response) => {
        console.log(response);
        localStorage.setItem('user', response.user.Username);
        localStorage.setItem('token', response.token);
        this.dialogRef.close();
        this.snackBar.open('You are logged in', 'OK', {
          duration: 2000,
          verticalPosition: 'top'
        });
        this.router.navigate(['movies']);
      },
      (response) => {
        this.snackBar.open(response, 'OK', {
          duration: 2000,
        });
      }
    );
  }

}