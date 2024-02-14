import Dexie, { Table } from "dexie";
import { IHero } from "@hero/shared";

export class IndexedDb extends Dexie {
    heroes!: Table<IHero, number>;
    // Type du contenu, Type de la PrimaryKey
    constructor() {
        super('dbName'); // On choisit le nom du Singleton
        this.version(1).stores(
            {
                heroes: '++id'// On initialise l'iddu 1er item de la table
            }
        );
        this.on(
            'populate', () => this.maSuperFonction()
        );
    }
    async maSuperFonction() {
        await db.heroes.bulkAdd([
            {id: '1', nom:'Toto', score:10, profil:null, pouvoirs:[] },
            {id: '2', nom:'Tata', score: 11, profil: null, pouvoirs: []},
        ]);
    }
}

export const db = new IndexedDb()