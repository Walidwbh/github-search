import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { UserData } from '../user-data';

@Injectable({
  providedIn: 'root'
})
export class GetUserService {
  constructor(private httpClient: HttpClient) { }
  getUser(user: string):Observable<UserData>{
    let headers = new HttpHeaders();
    let Url = `https://api.github.com/users/${user}`;
    // return this.httpClient.get<any>(Url, {headers: headers}).pipe(retry(3), catchError(this.httpErrorHandler))
    return this.httpClient.get<any>(Url, {headers: headers})
  }
    // method that handle errors for debugging
    private httpErrorHandler (error: HttpErrorResponse) {
      if(error.error instanceof ErrorEvent){
        console.error(`A client side error occured. the error message is ${error.message}`);
      }else {
        console.error(`An error happened in the server. the http status code is ${error.status} and the error returned is ${error.message}`)
      }
      return throwError(()=>{
        new Error("Error occured please try again");
      })
    }
}
