import { Component, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Album } from 'src/app/models/music.model';

@Component({
  selector: 'app-like',
  templateUrl: './like.component.html',
  styleUrls: ['./like.component.css']
})
export class LikeComponent {
  @Output()
  likeEvent = new EventEmitter<boolean>();
  @Output()
  likeAlbum = new EventEmitter<Album>();

  @Input()
  album: Album | undefined;

  @Input()
  albumTitre!: string;

  @Input()
  albumId!: number;

  like: boolean = false;
  addLike() {
    this.like = !this.like;
    if (this.album) {
      this.album.liked = this.like;
      this.likeAlbum.emit(this.album);
    }

    this.likeEvent.emit(this.like);
  }

}
