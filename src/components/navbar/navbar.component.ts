import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [FontAwesomeModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  icons = {
    arrowDown: faAngleDown,
  };

  user: any = undefined;

  isProfileMenuActive = false;

  logout() {
    this.authService.logout().subscribe({
      next: (res) => {
        localStorage.clear();
        this.router.navigateByUrl('/login');
      },
    });
  }

  toggleProfileMenu() {
    this.isProfileMenuActive = !this.isProfileMenuActive;
  }

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      let id = localStorage.getItem('id');
      this.authService.getUser(id).subscribe({
        next: (res) => {
          this.user = res;
        },
      });
    }
  }
}
