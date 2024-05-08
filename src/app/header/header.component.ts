import {Component, inject} from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {Router, RouterLink} from "@angular/router";
import {MatButton} from "@angular/material/button";
import {AuthService} from "../auth.service";
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule, MatButton, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  authService = inject(AuthService);

  constructor(private router: Router) { }

  handleLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
