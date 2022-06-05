import { Component, OnInit } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service'
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
//Card Component Imports
import { SynopsisCardComponent } from '../synopsis-card/synopsis-card.component';
import { GenreCardComponent } from '../genre-card/genre-card.component';
import { DirectorCardComponent } from '../director-card/director-card.component';
import { NavbarComponent } from '../navbar/navbar.component';


@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  user: any = {};
  Username = localStorage.getItem('user');
  movies: any[] = [];
  isFaves: any[] = [];
  currentUser: any = null;


  constructor(
    public fetchApiData: UserRegistrationService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public router: Router


  ) { }



  ngOnInit(): void {
    this.getMovies();

  }

  /**
   * Uses the API built to get a list of all movies in JSON format
   * @function getMovies
   */
  getMovies(): void {
    this.fetchApiData.getAllMoviesService().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  getFavoriteMovies(): void {
    this.fetchApiData.getFavoriteMovies().subscribe((resp: any) => {
      this.isFaves = resp;
      console.log(this.isFaves);
      return this.isFaves;
    });
  }

  /**
     * Opens the dialog to display the information from SynopsisCardComponent
     * @param title {string}
     * @param imagePath {any}
     * @param description {string}
     */
  openSynopsis(title: string, imagePath: any, description: string): void {
    this.dialog.open(SynopsisCardComponent, {
      data: {
        Title: title,
        ImagePath: imagePath,
        Description: description,
      },
      width: '500px',
      panelClass: 'synopsis-custom'
    });
  }

  /**
   * Opens the dialog to display the information from GenreCardComponent
   * @param name {string}
   * @param description {string}
   */
  openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreCardComponent, {
      data: {
        Name: name,
        Description: description,
      },
      width: '500px',
      panelClass: 'genre-custom'
    });
  }
  //Movie Component, Opens the director dialog box
  openDirectorDialog(name: string, bio: string, birth: Date): void {
    this.dialog.open(DirectorCardComponent, {
      data: {
        Name: name,
        Bio: bio,
        Birth: birth,
      },
      // Assign dialog width
      width: '500px'
    });

  }



  //Adds movie to favorite
  addFavorite(id: string): void {
    console.log(id);
    this.fetchApiData.addFavoriteMovies(id).subscribe((result) => {
      console.log(result);
      this.ngOnInit();
    })
  }

  removeFavorite(id: string): void {
    console.log(id);
    this.fetchApiData.deleteFavoriteMovies(id).subscribe((result) => {
      console.log(result);
      this.ngOnInit();
    })
  }

  isFav(id: string): boolean {
    return this.isFaves.includes(id)
  }

}