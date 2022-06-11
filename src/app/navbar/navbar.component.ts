import { Component, OnInit } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {


  constructor(
    public fetchApiData: UserRegistrationService,
    public router: Router,
    public snackBar: MatSnackBar,
    public dialog: MatDialogModule

  ) { }

  ngOnInit(): void {
  }
  /**
   * This function navigates to the movies page
   */
  navMovies(): void {
    this.router.navigate(['movies']);
  }

  /**
   * This function navigates to the user's profile page 
   */

  navProfile(): void {
    this.router.navigate(['profile']);
  }

  /**
   * This function signs the user out and returns them to the weclcome screen.
   *  Clears the local storage of the user's signed-in information.
   */
  logOut(): void {
    localStorage.clear();
    this.snackBar.open('You have been logged out.', 'Okay', {
      duration: 2000,
      verticalPosition: 'top',
    });
    this.router.navigate(['welcome']);
  }

}
