import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false;
  user: any = null; // Use 'any' for simplicity, you might want to create an interface for the user object
  firstName: string | null = null;

  constructor(public login: LoginService) {}

  ngOnInit(): void {
    this.isLoggedIn = this.login.isLoggedIn();
    this.user = this.login.getUser();

    if (this.user && this.user.firstName) {
      this.firstName = this.user.firstName;
    }
  }

  public logout() {
    this.login.logout();
    window.location.reload();
    localStorage.clear();
    this.user = null;
  }
}
