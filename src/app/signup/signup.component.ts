import {Component, inject, Input} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardContent, MatCardTitle} from "@angular/material/card";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {NgIf, NgOptimizedImage} from "@angular/common";
import {RouterLink} from "@angular/router";
import {AuthService} from "../auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    FormsModule,
    MatButton,
    MatCard,
    MatCardContent,
    MatCardTitle,
    MatFormField,
    MatInput,
    NgIf,
    NgOptimizedImage,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  });
  authService = inject(AuthService)

  constructor(private snackBar: MatSnackBar) {
  }

  submit() {
    if (this.form.valid) {
      this.authService.register(
        this.form.value.email,
        this.form.value.username,
        this.form.value.password
      ).then(() => {
         this.openSnackBar('User registered successfully')
      })
    }
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
        duration: 3000,
      });
  }

  @Input() error: string | undefined;

}
