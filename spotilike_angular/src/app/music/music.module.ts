import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListAlbumComponent } from './list-album/list-album.component';
import { DetailsAlbumComponent } from './details-album/details-album.component';
import { CreateAlbumComponent } from './create-album/create-album.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EditAlbumComponent } from './edit-album/edit-album.component';
import { CreateSongComponent } from './create-song/create-song.component';
import { ListArtistComponent } from './list-artist/list-artist.component';
import { AddFriendComponent } from './add-friend/add-friend.component'


@NgModule({
  declarations: [
    ListAlbumComponent,
    DetailsAlbumComponent,
    CreateAlbumComponent,
    EditAlbumComponent,
    CreateSongComponent,
    ListArtistComponent,
    AddFriendComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    ListAlbumComponent,
    DetailsAlbumComponent,
    CreateAlbumComponent,
    EditAlbumComponent,
    ListAlbumComponent
  ]
})
export class MusicModule { }
