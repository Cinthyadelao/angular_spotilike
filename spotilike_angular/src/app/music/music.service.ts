import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { Album, Genre } from '../models/music.model';
import { IndexedDBService } from 'src/indexed.db';

@Injectable({
  providedIn: 'root'
})
export class MusicService {
  private apiUrl = 'https://localhost:7286/api';
  // private apiUrl ='https://spotilikewebapp-ete2amdtacc3dxcv.francecentral-01.azurewebsites.net/api'
  constructor(
    private http: HttpClient,
    private indexedDBService: IndexedDBService,
  ) { }

  getAlbums(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/albums`);
  }

  syncAlbumsToIndexedDB(): Observable<void> {
    return this.getAlbums().pipe(
      catchError(error => {
        console.error('Error synchronizing albums with IndexedDB:', error);
        return of([]);
      }),
      switchMap(albums => {
        return this.indexedDBService.syncAlbumsToIndexedDB(albums);
      })
    );
  }

  getAlbumsFromIndexedDB(): Observable<Album[]> {
    return this.indexedDBService.getAlbumsFromIndexedDB();
  }

  createAlbum(albumData: any): Observable<Album> {
    return this.http.post<any>(`${this.apiUrl}/Albums`, albumData);
  }

  getArtistes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/artistes`);
  }

  updateAlbum(albumId: string, updatedData: any): Observable<Album> {
    const url = `${this.apiUrl}/albums/${albumId}`;
    return this.http.put<Album>(url, updatedData);
  }

  deleteAlbum(albumId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const url = `${this.apiUrl}/albums/${albumId}`;
    return this.http.delete(url, { headers });
  }

  deleteArtiste(artisteId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    //para proyecto express
    //const url = `${this.apiUrl}/artiste/${artisteId}`;

    //para net
    const url = `${this.apiUrl}/artistes/${artisteId}`;

    return this.http.delete(url, { headers });
  }

  getArtiste(artisteId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/artistes/${artisteId}`);
  }

  createMorceau(morceauData: any): Observable<any> {
    //node
    //return this.http.post<any>(`${this.apiUrl}/songs`, morceauData);

    //net
    return this.http.post<any>(`${this.apiUrl}/morceaux`, morceauData);
  }

  getGenres(): Observable<Genre[]> {
    return this.http.get<any[]>(`${this.apiUrl}/gernes`);
  }

  getSongsByAlbumId(albumId: string): Observable<any> {
    //node
    //return this.http.get<any>(`${this.apiUrl}/albums/${albumId}/songs`);

    //net 
    return this.http.get<any>(`${this.apiUrl}/Albums/${albumId}/morceaux`);
  }

  getAlbum(id: string): Observable<Album> {
    return this.http.get<Album>(`${this.apiUrl}/albums/${id}`).pipe(
      catchError((error) => {
        console.error('Erreur lors de la récupération de l\'album:', error);
        throw error;
      })
    );
  }
}