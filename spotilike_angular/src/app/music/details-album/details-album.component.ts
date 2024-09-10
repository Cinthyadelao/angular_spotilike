import { Component, OnInit } from '@angular/core';
import { Album, Artiste, Morceau } from 'src/app/models/music.model';
import { MusicService } from '../music.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-details-album',
  templateUrl: './details-album.component.html',
  styleUrls: ['./details-album.component.css']
})
export class DetailsAlbumComponent implements OnInit {
  albumId!: string;
  album!: Album;
  morceaux!: Morceau[];
  artiste!: Artiste;

  constructor(private musicService: MusicService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.albumId = this.route.snapshot.params['id'];
    console.log('ID de l\'album:', this.albumId);
    this.getAlbum();
    this.getSongsByAlbumId();
  }

  getSongsByAlbumId() {
    if (this.albumId) {
      this.musicService.getSongsByAlbumId(this.albumId).subscribe(
        (response) => {
          console.log('Chansons obtenues avec succès:', response);
          this.morceaux = response.songs;
        },
        (error) => {
          console.error('Erreur lors de la récupération des chansons:', error);
        }
      );
    } else {
      console.error('albumId n\'est pas défini');
    }
  }

  getAlbum() {
    this.musicService.getAlbums().subscribe(
      (albums) => {
        const album = albums.find(a => a.id === this.albumId);
        if (album) {
          this.album = album;
          console.log('Détails de l\'album:', this.album);

          if (this.album.artiste) {
            console.log('Artiste de l\'album:', this.album.artiste);
            this.getArtist(this.album.artiste);
          }
        } else {
          console.error('Album introuvable pour l\'ID spécifié:', this.albumId);
        }
      },
      (error) => {
        console.error('Erreur lors de la récupération des albums:', error);
      }
    );
  }

  getArtist(artistId: any) {
    this.musicService.getArtiste(artistId).subscribe(
      (artisteResponse) => {
        this.artiste = artisteResponse;
        console.log('Détails de l\'artiste:', this.artiste);
      },
      (error) => {
        console.error('Erreur lors de la récupération des détails de l\'artiste:', error);
      }
    );
  }

  openCreateMorceau(id: string): void {
    this.router.navigate([`songs/${id}/create`]);
  }

  goBack(): void {
    this.router.navigate(['/albums']);
  }
}