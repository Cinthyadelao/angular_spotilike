import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdministrationModule } from './administration/administration.module';
import { MusicModule } from './music/music.module';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MusicRouterModule } from './music/music-routing.module';
import { AdministrationRouterModule } from './administration/administration-routing.module';
import { AuthService } from './administration/auth/auth.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AdministrationModule,
    MusicModule,
    HttpClientModule,
    RouterModule,
    MusicRouterModule,
    AdministrationRouterModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
