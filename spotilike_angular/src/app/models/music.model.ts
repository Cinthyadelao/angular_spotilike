export interface Album {
    //express
    //_id: string;
    //net
    id: string;
    titre: string;
    pochette: string;
    date_sortie: string;
    morceaux: Morceau[];
    artiste: Artiste;
    liked?: boolean;
}

export interface Morceau {
    //express
    //_id: string;
    //net
    id: string;
    titre: string;
    duree: string;
    artiste: Artiste;
    genre: Genre[];
    album: Album;
}

export interface Artiste {
    //express
    //_id: string;
    //net
    id: string;
    name: string;
    avatar: string;
    biographie: string;
}


export interface Genre {
    //express
    //_id: string;
    //net
    id: string;
    titre: string;
    description: string;
}
