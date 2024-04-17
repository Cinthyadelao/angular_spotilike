import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {

  form!: FormGroup;

  constructor(private authService: AuthService, private route: ActivatedRoute,
    private router: Router) { }
  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),

    });
  }

  onSubmit() {
    console.log(this.form.value)
    if (this.form.valid) {
      this.authService.registerUser(this.form.value).subscribe(
        (response) => {
          this.router.navigate(['/login']);
          console.log('Utilisateur enregistré:', response);
        },
        (error) => {
          console.error('Error d enregistrement:', error);
        }
      );
    } else {
      console.error('Fromulaire no valid');
    }
  }

  goBack(): void {
    this.router.navigate(['/login']);
  }
}