import { Component } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {RouterLink} from "@angular/router";
import {MatButton} from "@angular/material/button";
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule, RouterLink, MatButton],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

}
