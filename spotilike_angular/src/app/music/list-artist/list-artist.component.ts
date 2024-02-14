import { Component } from '@angular/core';
import { Artiste } from 'src/app/models/music.model';
import { MusicService } from '../music.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-list-artist',
  templateUrl: './list-artist.component.html',
  styleUrls: ['./list-artist.component.css']
})
export class ListArtistComponent {

  listArtists!: Artiste[];
  selectedArtistId: string | null = null;
  selectedArtist: any;
  mode!: string;

  constructor(private musicService: MusicService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.getArtists();
  }

  getArtists() {
    this.musicService.getArtistes().subscribe(
      (response) => {
        this.listArtists = response;
        console.log('Artistas obtenidos:', this.listArtists);
      },
      (error) => {
        console.error('Error al obtener artistas:', error);
      }
    );
    const artistId = this.route.snapshot.params['id'];
    if (artistId) {
      this.mode = 'edit';
      this.router.navigate(['modify-artist', artistId]);
    } else {
      this.mode = 'create';
    }
  }

  openArtistDetail(artistId: string): void {
    this.router.navigate([`artists/${artistId}`]);
  }

  selectArtist(artist: any): void {
    this.selectedArtist = artist;
  }

  modifyArtist(id: string): void {
    this.selectedArtist = id;
    this.router.navigate([`artists/${id}/edit`]);
    console.log(this.selectedArtist);
  }

  openCreateArtist(): void {
    this.router.navigate(['artists/create']);
  }

  deleteArtist(artistId: string): void {
    this.musicService.deleteArtiste(artistId).subscribe(
      (response) => {
        console.log('Artista eliminado con éxito:', response);
        this.getArtists();
      },
      (error) => {
        console.error('Error al eliminar el artista:', error);
      }
    );
  }
}
