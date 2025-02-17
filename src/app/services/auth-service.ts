import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { APIResponse } from '../models/api-response';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = "http://localhost:5000/api/account";

  private token = "token";

  private httpClient = inject(HttpClient);

  register(data: FormData): Observable<APIResponse<string>> {
    return this.httpClient.post<APIResponse<string>>(`${this.baseUrl}/register`,
      data
    ).pipe(
      tap((response) => {
        localStorage.setItem(this.token, response.data);
      })
    );
  }

  login(email:string, password:string): Observable<APIResponse<string>> {
    return this.httpClient.post<APIResponse<string>>(`${this.baseUrl}/login`,{
      email,
      password
    }).pipe(tap((response)=>{
        if(response.isSuccess){
        localStorage.setItem(this.token, response.data);
      }

      return response;
    }));
  }

  me (): Observable<APIResponse<User>> {
    return this.httpClient.get<APIResponse<User>>(`${this.baseUrl}/me`, {
      headers:{
        "Authorization":`Bearer ${this.getAccessToken}`,
      },
    }).pipe(tap((response)=>{
      if(response.isSuccess) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response;
    }));
  }

  get getAccessToken():string|null{
    return localStorage.getItem(this.token) || '';
  }

  isLoggedIn():boolean{
    return !!localStorage.getItem(this.token);
  }
}
