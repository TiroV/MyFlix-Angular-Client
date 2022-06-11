import { Injectable } from '@angular/core';
//might be showing issues. If something goes wrong, check here. 'rxjs/internal/operators';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://our-very-own.herokuapp.com/';
const username = localStorage.getItem('user');
const token = localStorage.getItem('token');



@Injectable({
  providedIn: 'root'
})
export class UserRegistrationService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {
  }
  // Making the api call for the user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Calls API endpoint for the user to log in
   * @function userLogin
   * @param userDetails 
   * @returns userDetails, or a user's information
   */
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'login', userDetails)
      .pipe(catchError(this.handleError)
      );
  }

  /**
   * Function to make an API call to get all movies
   * @function getAllMoviesService
   * @returns An array of all movies in JSON format
   */
  getAllMoviesService(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(catchError(this.handleError));
  }

  /**
   * Makes an API call to get details about a single movie
   * @function getSingleMovie
   * @returns a single movie in JSON format
   */
  getSingleMovie(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies/:title', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(catchError(this.handleError));
  }

  /**
   * Makes an API call to get details about a director
   * @function getDirector
   * @returns a director's information in JSON format
   */
  getDirector(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'directors/:name', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(catchError(this.handleError));
  }

  /**
   * Makes an API call to get details about a specific genre
   * @function getGenre
   * @returns a genre's information in JSON format
   */
  getGenre(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'genres/:name', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(catchError(this.handleError));
  }

  /**
   * Makes an API call to get details about a user
   * @function getUser
   * @returns User's information
   */
  getUser(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + `users/${username}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(catchError(this.handleError));
  }

  /**
   * Makes an API call to get details about a user's favorite movie
   * @function getFavoriteMovies
   * @returns 
   */
  getFavoriteMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http
      .get(apiUrl + `users/:Username/movies/:MovieID`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(catchError(this.handleError));
  }


  /**
   * Makes an API call to add a single movie to a user's favorites
   * @function addFavoriteMovies
   * @param MovieID 
   * @returns the user's list of favorite movies
   */
  public addFavoriteMovies(MovieID: string): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    console.log('MovieID:' + MovieID)
    return this.http
      .post(apiUrl + `users/${username}/movies/${MovieID}`, null, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })

  }

  /**
   * Makes an API call to delete a single movie from the user's favorites
   * @function deleteFavoriteMovies
   * @param MovieID 
   * @returns the user's list of favorite movies, updated to to remove a favorite
   */
  public deleteFavoriteMovies(MovieID: string): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    console.log('ID: ' + MovieID);
    return this.http
      .delete(apiUrl + `users/${username}/movies/${MovieID}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
  }

  /**
   * Makes an API call to edit the user's profile information
   * @function editUserProfile
   * @param userData 
   * @returns the user's information, updated to reflect changes made
   */
  editUserProfile(userData: object): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .put(apiUrl + `users/${username}`, userData, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(catchError(this.handleError));
  }

  /**
   * Makes an api call to delete a user's profile
   * @function deleteUserProfile
   * @returns Hopefully nothing, deletes a user's profile
   */
  deleteUserProfile(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .delete(apiUrl + `users/${username}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(catchError(this.handleError));
  }





  //Function to handle errors
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }
}



@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {

  constructor() { }
}


