import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { UserRegistrationService } from '../fetch-api-data.service';
import { DirectorCardComponent } from '../director-card/director-card.component';
import { GenreCardComponent } from '../genre-card/genre-card.component';
import { SynopsisCardComponent } from '../synopsis-card/synopsis-card.component';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss']
})
export class ProfileViewComponent implements OnInit {


  user: any = {};
  userName: any = localStorage.getItem('user');
  movies: any[] = [];
  favoriteMovies: any[] = [];
  displayElement: boolean = false


  constructor(
    public fetchApiData: UserRegistrationService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getUserProfile();;
    this.getFavoriteMovies();
  }
  //User Functions//

  /**
   * Makes a call to the API to get the user's information.
   * @Returns object holding user data
   * @function getUserProfile 
   */
  getUserProfile(): void {
    const username = localStorage.getItem('user');
    if (username) {
      this.fetchApiData.getUser().subscribe((res: any) => {
        this.user = res;
        console.log(this.user);
        return this.user;
      });
    }
  }

  /**
   * Opens the Edit Profile Component, a small dialog box for the user to edit their profile information
   * @function openEditProfile
   */
  openEditProfile(): void {
    this.dialog.open(EditProfileComponent, {
      width: '500px',
      panelClass: 'edit-user-custom',
    });
  }
  /**
   * Deletes the profile of the user currently logged in.
   * @function deleteUserProfile
   */
  deleteUserProfile(): void {
    if (confirm('Are your sure you want to delete your account? This can\'t be undone.')) {
      this.router.navigate(['welcome']).then(() => {
        this.snackBar.open('Your account has been deleted', 'OK', {
          duration: 6000,
          verticalPosition: 'top'
        });
      });
      this.router.navigate(['welcome'])
      this.fetchApiData.deleteUserProfile().subscribe(() => {
        localStorage.clear();
      });
    }
  }

  //End of User Functions // 

  //Movie Functions //

  /**
   * Gets list of favorite movies
   * @function getFavoriteMovies
   * 
   */
  getFavoriteMovies(): void {
    this.fetchApiData.getAllMoviesService().subscribe((resp: any) => {
      this.movies = resp;
      this.movies.forEach((movie: any) => {
        if (this.user.FavoriteMovies.includes(movie._id)) {
          this.favoriteMovies.push(movie);
        }
      });
    });
    console.log(this.favoriteMovies);
  }
  /**
   * Removes favorite movies from list
   * @function deleteFavoriteMovies
   * @param id 
   */
  deleteFavoriteMovies(id: string): void {
    this.fetchApiData.deleteFavoriteMovies(id).subscribe((res: any) => {
      this.snackBar.open('Successfully removed from favorite movies.', 'OK', {
        duration: 2000,
      });
      this.ngOnInit();
      window.location.reload();
      return this.favoriteMovies;
    });
  }

  /**
   * Function to open the synopsis dialog to get more information about a movie.
   * @function openSynopsisDialog
   * @param title 
   * @param imagePath 
   * @param description 
   * @module SynopsisCardComponent
   */
  openSynopsisDialog(title: string, imagePath: any, description: string): void {
    this.dialog.open(SynopsisCardComponent, {
      data: {
        Title: title,
        ImagePath: imagePath,
        Description: description,
      },
      width: '500px',
    });
  }

  /**
   * Function to open genre card for specific movie when clicked
   * @param title 
   * @param name 
   * @param bio 
   * @param birth 
   * @module DirectorCardComponent
   */
  openDirectorDialog(title: string, name: string, bio: string, birth: string): void {
    this.dialog.open(DirectorCardComponent, {
      data: {
        Title: title,
        Name: name,
        Bio: bio,
        Birth: birth,
      },
      width: '500px',
      panelClass: 'director-custom'
    });
  }

  /**
   * Function to open the Genre card dialog box for a specific movie when clicked
   * @function openGenreDialog
   * @param name 
   * @param description 
   * @module GenreCardComponent
   */
  openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreCardComponent, {
      data: {
        Name: name,
        Description: description,
      },
      width: '500px',
    });
  }

}
