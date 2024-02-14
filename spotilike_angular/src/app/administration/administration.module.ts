import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth/auth/auth.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { AdministrationRouterModule } from './administration-routing.module';



@NgModule({
  declarations: [
    AuthComponent,
    SignUpComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AdministrationRouterModule
  ],
  exports: [
    AuthComponent
  ]
})
export class AdministrationModule { }
