import { Component, OnInit } from '@angular/core';
import { AuthService } from './administration/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'spotilike_angular';

  constructor(private authService: AuthService, private router: Router) { }
  ngOnInit(): void {
    this.authService.isLoggedIn.subscribe((loggedIn) => {
      console.log('Utilisateur authentifié:', loggedIn);
      if (loggedIn) {
        this.router.navigate(['/albums']);
      }
    });
  }
}
