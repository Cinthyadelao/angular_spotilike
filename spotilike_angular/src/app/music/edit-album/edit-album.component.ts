import { Component } from '@angular/core';
import { MusicService } from '../music.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Artiste } from 'src/app/models/music.model';

@Component({
  selector: 'app-edit-album',
  templateUrl: './edit-album.component.html',
  styleUrls: ['./edit-album.component.css']
})
export class EditAlbumComponent {
  albumForm!: FormGroup;
  artistes!: Artiste[];
  constructor(
    private formBuilder: FormBuilder,
    private musicService: MusicService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.getArtistes();
    const albumId = this.route.snapshot.params['id'];
    if (albumId) {
      this.getAlbum(albumId);
    }
  }

  initForm(): void {
    this.albumForm = this.formBuilder.group({
      titre: ['', Validators.required],
      pochette: ['', Validators.required],
      date_sortie: ['', Validators.required],
      artiste: ['', Validators.required],
    });
  }

  getAlbum(albumId: string): void {
    this.musicService.getAlbum(albumId).subscribe(
      (album) => {
        this.albumForm.patchValue({
          titre: album.titre,
          pochette: album.pochette,
          date_de_sortie: album.date_sortie,
          artiste: album.artiste
        });
      },
      (error) => {
        console.error('Error al obtener detalles del álbum:', error);
      }
    );
  }

  onSubmit(): void {
    if (this.albumForm.valid) {
      const formData = this.albumForm.value;
      const albumId = this.route.snapshot.params['id'];

      this.musicService.updateAlbum(albumId, formData).subscribe(
        (response) => {
          console.log('Album mis à jour:', response);
          this.router.navigate(['/albums']);
        },
        (error) => {
          console.error('Error mis à jour album:', error);
        }
      );
    }
  }
  getArtistes(): void {
    this.musicService.getArtistes().subscribe(
      (response) => {
        this.artistes = response;
        console.log('Liste des artistes obtenue avec succès:', this.artistes);
      },
      (error) => {
        console.error('Erreur lors de l obtention de la liste des artistes:', error);
      }
    );
  }

  goBack(): void {
    this.router.navigate(['/albums']);
  }
}
