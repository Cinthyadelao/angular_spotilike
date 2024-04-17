import Dexie from 'dexie';
import { Injectable } from '@angular/core';
import { Album } from '../models/music.model';

@Injectable({
    providedIn: 'root'
})
export class DexieService extends Dexie {
    albums: Dexie.Table<Album, number>;

    constructor() {
        super('Spotilike database');
        this.version(1).stores({
            albums: '++id, title, artist, year'
        });
        this.albums = this.table('albums');
    }
}