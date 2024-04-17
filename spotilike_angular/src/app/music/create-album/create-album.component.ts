import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MusicService } from '../music.service';
import { Artiste } from 'src/app/models/music.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-album',
  templateUrl: './create-album.component.html',
  styleUrls: ['./create-album.component.css']
})
export class CreateAlbumComponent {
  albumForm!: FormGroup;
  artistes: Artiste[] = [];
  successMessage: string = '';

  constructor(private formBuilder: FormBuilder, private musicService: MusicService, private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.initForm();
    this.getArtistes();
  }

  private initForm(): void {
    this.albumForm = this.formBuilder.group({
      titre: ['', Validators.required],
      pochette: ['', Validators.required],
      date_de_sortie: ['', Validators.required],
      artiste: ['', Validators.required],
    });
  }

  getArtistes(): void {
    this.musicService.getArtistes().subscribe(
      (response) => {
        this.artistes = response;
        console.log('liste d artistes:', this.artistes);
      },
      (error) => {
        console.error('Error liste d artistes:', error);
      }
    );
  }


  onSubmit(): void {
    if (this.albumForm.valid) {
      const newAlbum = this.albumForm.value;
      this.musicService.createAlbum(newAlbum).subscribe(
        (response) => {
          console.log('Álbum crée:', response);
          this.successMessage = 'Album ajouté';
          this.albumForm.reset();
        },
        (error) => {
          console.error('Error creation album:', error);
        }
      );
    }
  }

  goBack(): void {
    this.router.navigate(['/albums']);
  }
}
