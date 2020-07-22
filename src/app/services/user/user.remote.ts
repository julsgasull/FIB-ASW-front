import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/models/user.interface';
import { Contribution } from 'src/app/models/contribution.model';
import { FirebaseUserModel } from 'src/app/core/user.model';

@Injectable()
export class UserRemote {
  
  constructor (
    private httpClient: HttpClient
  ) {}

  /* ==== GET ==== */
  getById(user_id: number): Observable<FirebaseUserModel> {
    return this.httpClient.get<FirebaseUserModel>(`${environment.API_URL}/users/`+ user_id, 
    { 
      headers:{ 'Accept':'application/json' } 
    })
  }
  getByEmail(email: string): Observable<FirebaseUserModel> {
    return this.httpClient.get<FirebaseUserModel>(`${environment.API_URL}/users/`+ email + `/byEmail`, 
    { 
      headers:{ 'Accept':'application/json' } 
    })
  }

  /* ==== POST ==== */
  updateUser(user_id: number, about: string, api_key: string): Observable<FirebaseUserModel> {
    return this.httpClient.post<FirebaseUserModel>(`${environment.API_URL}/users/` + user_id, 
    {
      'about': about
    },
    {       
      headers: { 
        'Accept':'application/json',
        'API_KEY': api_key
      }  
    });
  }
}