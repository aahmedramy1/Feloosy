import {Component, inject, Input} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {NgIf, NgOptimizedImage} from "@angular/common";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {Router, RouterLink} from "@angular/router";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule, NgIf, ReactiveFormsModule, MatInput, MatButton, NgOptimizedImage, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  authService = inject(AuthService)

  constructor(private router: Router) {
  }

  submit() {
    if (this.form.valid) {
      this.authService.login(
        this.form.value.username,
        this.form.value.password
      ).then(async (response) => {
          await this.router.navigate(['/']);
        }
      )
    }
  }

  @Input() error: string | undefined;
}
