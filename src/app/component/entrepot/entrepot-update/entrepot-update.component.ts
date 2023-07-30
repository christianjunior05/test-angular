import { Component, OnInit } from '@angular/core';
import {Entrepot} from "../../../model/entrepot.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {EntrepotService} from "../entrepot.service";
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


  constructor( private formBuilder: FormBuilder,
               private router: Router,
               private route: ActivatedRoute,
               private entrepotService: EntrepotService
  ) { }

  ngOnInit() {
    this.entrepotForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      address: ['', [Validators.required, Validators.maxLength(50)]],
      capacity: ['', [Validators.required, Validators.maxLength(10)]],
      stock: ['', Validators.required]
    });

    this.route.params.subscribe(params => {
      this.isEditMode = !!params['id'];
      if (this.isEditMode) {
        this.entrepotService.find(params['id']).subscribe(data => {
          if (data) {
            this.entrepot = data;
            this.updateForm(this.entrepot);
          } else {
          }
        });
      }
    });

  }
  private updateForm(entrepot: Entrepot): void {
    this.entrepotForm.patchValue({
      name: entrepot.name,
      address: entrepot.address,
      capacity: entrepot.capacity,
      stock: entrepot.stock,
    });
  }

  private updateEntrepot(entrepot: Entrepot): void {
    entrepot.name = this.entrepotForm.get(['name'])!.value;
    entrepot.address = this.entrepotForm.get(['address'])!.value;
    entrepot.capacity = this.entrepotForm.get(['capacity'])!.value;
    entrepot.stock = this.entrepotForm.get(['stock'])!.value;
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
    this.updateEntrepot(this.entrepot);

    if (this.isEditMode) {
      // @ts-ignore
      this.entrepotService.updateEntrepot(this.entrepot).subscribe(
        () => {
          this.isSaving = false;
          Swal.fire({
            icon: 'success',
            title: 'Succès!',
            text: 'L\'acteur a été mis à jour avec succès!',
            timer: 7000 // durée de 5 secondes
          });
          this.onSaveSuccess();
        },
        () => this.onSaveError()
      );
    } else {
      // @ts-ignore
      this.entrepotService.addEntrepot(this.entrepot).subscribe(
        () => {
          this.isSaving = false;
          Swal.fire({
            icon: 'success',
            title: 'Succès!',
            text: 'L\'acteur a été créé avec succès!',
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
  }

  previousState(): void {
    window.history.back();
  }
  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

}
