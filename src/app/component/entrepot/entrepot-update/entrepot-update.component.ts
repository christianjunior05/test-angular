import { Component, OnInit } from '@angular/core';
import { Entrepot } from "../../../model/entrepot.model";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { EntrepotService } from "../entrepot.service";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-entrepot-update',
  templateUrl: './entrepot-update.component.html',
  styleUrls: ['./entrepot-update.component.css']
})
export class EntrepotUpdateComponent implements OnInit {
  entrepotForm!: FormGroup;
  entrepot: Entrepot = new Entrepot();
  activeTab = 'general';

  isEditMode!: boolean;
  isSaving = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private entrepotService: EntrepotService
  ) { }

  ngOnInit() {
    this.entrepotForm = this.formBuilder.group({
      libelle: ['', [Validators.required, Validators.maxLength(50)]],
      superficy: ['', [Validators.required, Validators.maxLength(50)]],
      placer: ['', [Validators.required, Validators.maxLength(10)]],
      longitude: ['', Validators.required],
      latitude: ['', Validators.required],
    });

    this.route.params.subscribe(params => {
      this.isEditMode = !!params['id'];
      if (this.isEditMode) {
        this.entrepotService.find(params['id']).subscribe(data => {
          if (data) {
            this.entrepot = data;
            this.updateForm(this.entrepot);
          } else {
            // Gérer le cas où l'entrepôt n'a pas été trouvé par son ID
          }
        });
      }
    });
  }

  private updateForm(entrepot: Entrepot): void {
    this.entrepotForm.patchValue({
      libelle: entrepot.libelle,
      longitude: entrepot.longitude,
      latitude: entrepot.latitude,
      placer: entrepot.placer,
      superficy: entrepot.superficy,
    });
  }

  private updateEntrepot(entrepot: Entrepot): void {
    entrepot.libelle = this.entrepotForm.get(['libelle'])!.value;
    entrepot.longitude = this.entrepotForm.get(['longitude'])!.value;
    entrepot.latitude = this.entrepotForm.get(['latitude'])!.value;
    entrepot.placer = this.entrepotForm.get(['placer'])!.value;
    entrepot.superficy = this.entrepotForm.get(['superficy'])!.value;
  }

  onSubmit(): void {
    if (this.entrepotForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Veuillez remplir correctement tous les champs du formulaire!',
        timer: 5000 // durée de 7 secondes
      });
      return;
    }

    this.isSaving = true;
    const formData = this.entrepotForm.value;
    const newEntrepot: Entrepot = { ...this.entrepot, ...formData };

    if (this.isEditMode) {
      this.entrepotService.updateEntrepot(newEntrepot).then(
        () => {
          this.isSaving = false;
          Swal.fire({
            icon: 'success',
            title: 'Succès!',
            text: 'L\'entrepot a été mis à jour avec succès!',
            timer: 7000 // durée de 5 secondes
          });
          this.onSaveSuccess();
        },
        () => this.onSaveError()
      );
    } else {
      this.entrepotService.addEntrepot(newEntrepot).then(
        () => {
          this.isSaving = false;
          Swal.fire({
            icon: 'success',
            title: 'Succès!',
            text: 'L\'entrepot a été créé avec succès!',
            timer: 5000 // durée de 5 secondes
          });
          this.onSaveSuccess();
        },
        () => this.onSaveError()
      );
    }
  }

  private onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  private onSaveError(): void {
    this.isSaving = false;
    // Gérer les erreurs de sauvegarde ici
  }

  previousState(): void {
    window.history.back();
  }
}
