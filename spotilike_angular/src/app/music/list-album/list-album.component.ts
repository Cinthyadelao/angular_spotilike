import { Component, Input, OnInit } from '@angular/core';
import { Album, Morceau } from 'src/app/models/music.model';
import { MusicService } from '../music.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-list-album',
  templateUrl: './list-album.component.html',
  styleUrls: ['./list-album.component.css']
})
export class ListAlbumComponent implements OnInit {


  listSongs!: Morceau[];

  listAlbums!: Album[];
  selectedAlbumId: string | null = null;
  selectedAlbum: any;
  mode!: string;

  constructor(private musicService: MusicService, private route: ActivatedRoute,
    private router: Router) { }
  ngOnInit(): void {
    this.getAlbums()
  }

  getAlbums() {
    this.musicService.getAlbums().subscribe(
      (response) => {
        this.listAlbums = response;
        console.log('Albumes:', this.listAlbums);
      },
      (error) => {
        console.error('Erreur albums:', error);
      }
    );
    const albumId = this.route.snapshot.params['id'];
    if (albumId) {
      this.mode = 'edit';

      this.router.navigate(['modificar-album', albumId]);
    } else {
      this.mode = 'create';
    }
  }


  openAlbumDetail(albumId: string): void {
    this.router.navigate([`albums/${albumId}`]);
  }
  openArtistes(): void {
    this.router.navigate([`artistes`]);
  }

  findAlbum(albumId: string): Album | undefined {
    return this.listAlbums.find(album => album._id === albumId);
  }

  selectAlbum(album: any): void {
    this.selectedAlbum = album;
  }

  modifyAlbum(id: string): void {
    this.selectedAlbum = id;
    this.router.navigate([`albums/${id}/edit`]);
    console.log(this.selectedAlbum);
  }

  openCrateAlbum(): void {
    this.router.navigate([`albums/create`]);
  }

  deleteAlbum(albumId: string): void {
    this.musicService.deleteAlbum(albumId).subscribe(
      (response) => {
        console.log('album supprimé:', response);
        this.getAlbums();
      },
      (error) => {
        console.error('Erreur suppression album:', error);
      }
    );
  }

}



