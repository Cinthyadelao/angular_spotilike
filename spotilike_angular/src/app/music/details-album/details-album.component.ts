import { Component, Input, OnInit } from '@angular/core';
import { Album, Artiste, Morceau } from 'src/app/models/music.model';
import { MusicService } from '../music.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
@Component({
  selector: 'app-details-album',
  templateUrl: './details-album.component.html',
  styleUrls: ['./details-album.component.css']
})
export class DetailsAlbumComponent implements OnInit {
  albumId!: string;
  album!: Album;
  songs!: Morceau[];
  artiste!: Artiste;
  // album$ = new BehaviorSubject<Album | null>(null);
  // songs$ = new BehaviorSubject<Morceau[] | null>(null);
  // artiste$ = new BehaviorSubject<Artiste | null>(null);
  constructor(private musicService: MusicService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    ;
    this.albumId = this.route.snapshot.params['id'];
    console.log('ID d album:', this.albumId);
    this.getAlbum(this.albumId);
    this.getSongsByAlbumId();
  }

  getSongsByAlbumId() {
    if (this.albumId) {
      this.musicService.getSongsByAlbumId(this.albumId).subscribe(
        (songs) => {
          console.log('chansons obtenues:', songs);
          this.songs = songs;
        },
        (error) => {
          console.error('Erreur d obtention chansons:', error);
        }
      );
    } else {
      console.error('albumId non défini');
    }
  }
  getAlbum(albumId: string) {
    this.musicService.getAlbum(albumId).subscribe(
      (response) => {
        this.album = response;
        console.log('détails d album:', this.album);

        if (this.album && this.album.artiste) {
          console.log(this.album)

          console.log(this.album.artiste)
          this.getArtist(this.album.artiste);

        }
      },
      (error) => {
        console.error('Erreur à l obtention d album:', error);
      }
    );
  }

  getArtist(artistId: any) {
    this.musicService.getArtiste(artistId).subscribe(
      (artisteResponse) => {
        this.artiste = artisteResponse;
        console.log('détails artiste:', this.artiste);
      },
      (error) => {
        console.error('Error détails artiste:', error);
      }
    );
  }

  // getAlbum(albumId: string) {
  //   this.musicService.getAlbum(albumId).subscribe(
  //     (response) => {
  //       this.album.next(response);
  //       // Resto del código...
  //     },
  //     (error) => {
  //       console.error('Error al obtener detalles del álbum:', error);
  //     }
  //   );
  // }

  // getArtist(artistId: any) {
  //   this.musicService.getArtiste(artistId).subscribe(
  //     (artisteResponse) => {
  //       this.artiste$.next(artisteResponse);
  //       // Resto del código...
  //     },
  //     (error) => {
  //       console.error('Error al obtener detalles del artista:', error);
  //     }
  //   );
  // }


  openCrateMorceau(id: string): void {
    this.router.navigate([`songs/${id}/create`]);
  }

  goBack(): void {
    this.router.navigate(['/albums']);
  }

}
