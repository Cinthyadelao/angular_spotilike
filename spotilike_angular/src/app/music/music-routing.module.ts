import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListAlbumComponent } from './list-album/list-album.component';
import { CreateAlbumComponent } from './create-album/create-album.component';
import { authGuard } from '../administration/auth/auth.guard';
import { EditAlbumComponent } from './edit-album/edit-album.component';
import { DetailsAlbumComponent } from './details-album/details-album.component';
import { CreateSongComponent } from './create-song/create-song.component';
import { ListArtistComponent } from './list-artist/list-artist.component';
import { AddFriendComponent } from './add-friend/add-friend.component';


const routes: Routes = [
    { path: 'albums', component: ListAlbumComponent },
    { path: 'albums/addFriend', component: AddFriendComponent },
    { path: 'albums/create', component: CreateAlbumComponent },
    { path: 'albums/:id/edit', component: EditAlbumComponent },
    { path: 'albums/:id', component: DetailsAlbumComponent },
    { path: 'songs/:id/create', component: CreateSongComponent },
    { path: 'artistes', component: ListArtistComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MusicRouterModule { }
