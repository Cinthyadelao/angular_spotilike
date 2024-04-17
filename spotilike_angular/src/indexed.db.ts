import { Injectable } from '@angular/core';
import { Album } from 'src/app/models/music.model';
import { from, Observable } from 'rxjs';
import { DexieService } from './app/music/dixies.service'; // Importez le service DexieService

@Injectable({
    providedIn: 'root'
})
export class IndexedDBService {
    constructor(private dexieService: DexieService) { }

    async syncAlbumsToIndexedDB(albums: Album[]): Promise<void> {
        try {
            // Supprimer les albums existants dans IndexedDB
            await this.dexieService.albums.clear();
            // Ajouter les nouveaux albums
            for (const album of albums) {
                await this.dexieService.albums.put(album);
            }
            console.log('Albums synchronisés avec IndexedDB');
        } catch (error) {
            console.error('Erreur lors de la synchronisation des albums avec IndexedDB:', error);
            throw error;
        }
    }

    getAlbumsFromIndexedDB(): Observable<Album[]> {
        try {
            // Récupérer les albums depuis IndexedDB
            const promise = this.dexieService.albums.toArray();
            return from(promise);
        } catch (error) {
            console.error('Erreur lors de la récupération des albums depuis IndexedDB:', error);
            throw error;
        }
    }
}