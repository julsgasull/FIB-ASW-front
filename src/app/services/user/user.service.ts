import { Injectable } from '@angular/core';
import { UserRemote } from './user.remote';
import { Contribution } from '../../models/contribution.model';
import { Observable } from 'rxjs';
import { FirebaseUserModel } from '../../core/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor (
    private userRemote: UserRemote
  ) { }
  
  /* ==== GET ==== */
  getById(user_id: number): Observable<FirebaseUserModel> {
    return this.userRemote.getById(user_id);
  }
  getByEmail(email: string): Observable<FirebaseUserModel> {
    return this.userRemote.getByEmail(email);
  }

  /* ==== POST ==== */
  updateUser(user_id: number, about: string, api_key: string): Observable<FirebaseUserModel> {
    return this.userRemote.updateUser(user_id, about, api_key);
  }
}
