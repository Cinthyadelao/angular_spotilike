import { Injectable } from '@angular/core';
import { Album, Artiste, Genre, Morceau } from '../models/music.model';
import { Observable, catchError, delay, of, tap } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class MusicService {

  private apiUrl = 'http://localhost:5005/api'; // Ajusta la URL según la configuración de tu servidor

  listaDeAlbums!: Album[];

  constructor(private http: HttpClient) { }

  getListAlbum(): Observable<Album[]> {
    return of(this.listaDeAlbums).pipe(delay(1000));
  }

  getSongsByAlbumId(albumId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/albums/${albumId}/songs`);
  }
  getAlbum(albumId: string): Observable<Album> {
    return this.http.get<any>(`${this.apiUrl}/albums/${albumId}`);
  }



  getAlbums(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/albums`);
  }

  createAlbum(albumData: any): Observable<Album> {
    return this.http.post<any>(`${this.apiUrl}/albums`, albumData);
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
    const url = `${this.apiUrl}/artiste/${artisteId}`;
    return this.http.delete(url, { headers });
  }


  getArtiste(artisteId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/artistes/${artisteId}`);
  }

  createMorceau(morceauData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/songs`, morceauData);
  }

  getGenres(): Observable<Genre[]> {
    return this.http.get<any[]>(`${this.apiUrl}/gernes`);
  }

  // getArtistes(): Observable<Artiste[]> {
  //   return this.http.get<Artiste[]>(`${this.apiUrl}/artistes`).pipe(
  //     tap(data => console.log('Lista d artistes:', data)),
  //     catchError(error => {
  //       console.error('Error liste artistes:', error);
  //       throw error;
  //     })
  //   );
  // }
}
