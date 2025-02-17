import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AuthServiceService } from '../services/auth-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { APIResponse } from '../models/api-response';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [MatInputModule, MatIconModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  email!:string;
  password!:string;

  private authService = inject(AuthServiceService);
  private snackBar = inject(MatSnackBar);
  private router = inject(Router);

  hide = signal(false);

  login() {
    this.authService.login(this.email, this.password).subscribe({
      next:()=>{
        this.snackBar.open("Logged in successfully", 'Close');
      },
      error:(err:HttpErrorResponse)=>{
        let error = err.error as APIResponse<string>;

        this.snackBar.open(error.error, 'Close', {
          duration: 3000,
        });
      },
      complete: () => {
        this.router.navigate(['/']);
      }
    })
  }

  togglePassword(event:MouseEvent){
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
}
