import { Input, Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';
import { UserRegistrationService } from '../fetch-api-data.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  Username = localStorage.getItem('User');
  user: any = {};

  /**
   * Input values bound to userData.
   */
  @Input() userData = {
    Username: this.user.Username,
    Password: this.user.Password,
    email: this.user.email,
    Birthday: this.user.Birthday,
  };

  constructor(
    public fetchApiData: UserRegistrationService,
    public dialogRef: MatDialogRef<EditProfileComponent>,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  /**
   * Gets the user's profile data
   * @function getUserProfile
   * @Returns the data of the user that is currently logged in.
   */

  getUserProfile(): void {
    const user = localStorage.getItem('user');
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.user = resp;
      console.log(this.user)
    });
  }

  /**
   *Updates the user's information in the database
   *Shows a box to indicate that the user has been updated 
   *Then reloads the page
   *@function editUserProfile
   *@returns The user's updated information
   */

  editUserProfile(): void {
    this.fetchApiData.editUserProfile(this.userData).subscribe((resp) => {
      this.dialogRef.close();
      localStorage.setItem('user', resp.Username);
      this.snackBar.open('Profile update successful.', 'OK', {
        duration: 2000,
      });
      setTimeout(() => {
        window.location.reload();
      });
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}

