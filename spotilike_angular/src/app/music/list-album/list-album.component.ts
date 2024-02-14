import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Album, Morceau } from 'src/app/models/music.model';
import { MusicService } from '../music.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { OnlineStatusService } from 'src/online-status.service';

@Component({
  selector: 'app-list-album',
  templateUrl: './list-album.component.html',
  styleUrls: ['./list-album.component.css']
})
export class ListAlbumComponent implements OnInit {

  albumSubscribe!: Subscription;
  isOnline: Boolean = true;

  listSongs!: Morceau[];

  listAlbums!: Album[];
  selectedAlbumId: string | null = null;
  selectedAlbum: any;
  mode!: string;

  constructor(
    private musicService: MusicService, 
    private route: ActivatedRoute,
    private router: Router,
    private onLineStatusService : OnlineStatusService
    ) { }
    
  ngOnInit(): void {
    this.getAlbums()
  }

  ngOnDestroy(): void {
    if (this.albumSubscribe) {
      this.albumSubscribe.unsubscribe();
    }
  }

  getAlbums() {
    this.musicService.getAlbums().subscribe(
      (response) => {
        this.listAlbums = response;
        console.log('Álbumes obtenidos:', this.listAlbums);
      },
      (error) => {
        console.error('Error al obtener álbumes:', error);
      }
    );
    const albumId = this.route.snapshot.params['id'];
    if (albumId) {
      this.mode = 'edit';

      this.router.navigate(['modificar-album', albumId]);
    } else {
      this.mode = 'create';
    }

    if (!this.albumSubscribe) {
      this.albumSubscribe = this.onLineStatusService.connectionChanged.subscribe(
        isOnline => {
          if (isOnline) {
            console.log("Chargement des données vers backend" + isOnline);
            this.isOnline = true;
          } else {
            console.log("Chargement des données vers indexedDB " + isOnline);
            this.isOnline = false;
          }
        }
        );
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
        console.log('Álbum eliminado con éxito:', response);
        this.getAlbums();
      },
      (error) => {
        console.error('Error al eliminar el álbum:', error);
      }
    );
  }

}



