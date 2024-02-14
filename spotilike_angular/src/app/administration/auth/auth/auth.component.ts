import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {

  constructor(private authService: AuthService) { }

  form!: FormGroup;
  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  onSubmit() {
    console.log(this.form.value)
    //   if (this.form.valid) {
    //     const { email, password } = this.form.value;
    //     this.authService.loginUser(email, password).subscribe(
    //       (response) => {
    //         console.log('Usuario autenticado:', response);
    //       },
    //       (error) => {
    //         console.error('Error de autenticación:', error);
    //       }
    //     );
    //   }
    // }
    const { email, password } = this.form.value;

    this.authService.login(email, password).subscribe(
      () => {
      },
      (error) => {
        console.error('Error en inicio de sesión:', error);
      }
    );
  }
}

