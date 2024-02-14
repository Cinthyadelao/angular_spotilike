import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MusicService } from '../music.service';
import { Artiste, Genre } from 'src/app/models/music.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-song',
  templateUrl: './create-song.component.html',
  styleUrls: ['./create-song.component.css']
})
export class CreateSongComponent {
  morceauForm!: FormGroup;
  genres: Genre[] = [];
  album!: string;
  artiste!: Artiste;
  message: string = '';
  constructor(
    private formBuilder: FormBuilder,
    private musicService: MusicService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.album = params['id'];
      this.getAlbumAndArtist();
    });
    this.getArtist();
    this.getGenres();
    this.initForm();
  }

  initForm(): void {
    this.morceauForm = this.formBuilder.group({
      titre: ['', Validators.required],
      artiste: [this.artiste, Validators.required],
      album: [this.album, Validators.required],
      duree: ['', Validators.required],
      genre: [null, Validators.required],
    });
  }

  getArtist(): void {
    this.musicService.getAlbum(this.album).subscribe(
      (album) => { this.artiste = album.artiste })
  }

  getAlbumAndArtist(): void {
    this.musicService.getAlbum(this.album).subscribe(
      (album) => {
        this.artiste = album.artiste;
        this.initForm();
      },
      (error) => {
        console.error('Error al obtener el álbum y el artista:', error);
      }
    );
  }

  getGenres(): void {
    this.musicService.getGenres().subscribe(
      (genres) => {
        this.genres = genres;
      },
      (error) => {
        console.error('Error al obtener géneros:', error);
      }
    );
  }

  crearMorceau(): void {
    console.log(this.morceauForm.value);
    console.log(this.morceauForm.valid);
    if (this.morceauForm.valid) {
      const morceauData = this.morceauForm.value;
      this.musicService.createMorceau(morceauData).subscribe(
        () => {
          this.message = 'Morceau créé avec succès';
          this.morceauForm.reset();
        },
        (error) => {
          this.message = 'Erreur lors de la création du morceau';
          console.error('Error al crear el morceau:', error);
        }
      );
    }
  }
}
