import { Component, OnInit, OnDestroy } from '@angular/core';
import { Album } from 'src/app/models/music.model';
import { MusicService } from '../music.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { OnlineStatusService } from 'src/online-status.service';

@Component({
  selector: 'app-list-album',
  templateUrl: './list-album.component.html',
  styleUrls: ['./list-album.component.css']
})
export class ListAlbumComponent implements OnInit, OnDestroy {
  albumSubscribe!: Subscription;
  isOnline = true;
  listAlbums!: Album[];
  selectedAlbumId: string | null = null;
  selectedAlbum: any;
  mode!: string;

  constructor(
    private musicService: MusicService,
    private route: ActivatedRoute,
    private router: Router,
    private onlineStatusService: OnlineStatusService
  ) { }

  ngOnInit(): void {

    this.getAlbums();
    this.syncAlbumsToIndexedDB();

    this.albumSubscribe = this.onlineStatusService.connectionChanged.subscribe(isOnline => {
      this.isOnline = isOnline;
      if (isOnline) {
        console.log("Chargement des données vers backend " + isOnline);
        this.getAlbums();
        this.syncAlbumsToIndexedDB();
      } else {
        console.log("Chargement des données depuis IndexedDB ");
        this.getAlbumsFromIndexedDB();
      }
    });
  }

  ngOnDestroy(): void {
    this.albumSubscribe.unsubscribe();
  }

  getAlbums() {
    this.musicService.getAlbums().subscribe(
      (albums) => {
        this.listAlbums = albums;
        console.log('Albums obtenus:', this.listAlbums);
      },
      (error) => {
        console.error('Erreur lors de la récupération des albums:', error);
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

  getAlbumsFromIndexedDB() {
    this.musicService.getAlbumsFromIndexedDB().subscribe(
      (albums) => {
        this.listAlbums = albums;
        console.log('Albums obtenus depuis IndexedDB:', this.listAlbums);
      },
      (error) => {
        console.error('Erreur lors de la récupération des albums depuis IndexedDB:', error);
      }
    );
  }

  syncAlbumsToIndexedDB() {
    this.musicService.syncAlbumsToIndexedDB().subscribe(
      () => {
        console.log('Synchronisation des albums avec IndexedDB réussie');
      },
      (error) => {
        console.error('Erreur lors de la synchronisation des albums avec IndexedDB:', error);
      }
    );
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

  openCreateAlbum(): void {
    this.router.navigate([`albums/create`]);
  }

  deleteAlbum(albumId: string): void {
    this.musicService.deleteAlbum(albumId).subscribe(
      (response) => {
        console.log('Album supprimé avec succès:', response);
        this.getAlbums();
      },
      (error) => {
        console.error('Erreur lors de la suppression de l\'album:', error);
      }
    );
  }
}