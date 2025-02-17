import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { APIResponse } from '../models/api-response';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private baseUrl = "http://localhost:5000/api/account";

  private httpClient = inject(HttpClient);

  register(data: FormData): Observable<APIResponse<string>> {
    return this.httpClient.post<APIResponse<string>>(`${this.baseUrl}/register`,
      data
    ).pipe(
      tap((response) => {
        localStorage.setItem("token", response.data);
      })
    );
  }
}
