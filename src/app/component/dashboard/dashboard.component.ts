import {Component, Input, OnInit} from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import {Entrepot} from "../../model/entrepot.model";
import {Router} from "@angular/router";
import {EntrepotService} from "../entrepot/entrepot.service";
import Swal from 'sweetalert2';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css', '../../../assets/libs/datatables.scss']
})
export class DashboardComponent implements OnInit {
  @Input() editLink = 'update';
    entrepot: Entrepot[] = [];


  constructor(private auth: AuthService, private entrep: EntrepotService, private router: Router) { }

  ngOnInit(): void {
    this.getAllEntrepot();
  }

  getAllEntrepot() {

    this.entrep.getAllEntrepot().subscribe(res => {

      this.entrepot = res.map((e: any) => {
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        return data;
      })

    }, err => {
      alert('Error while fetching student data');
    })

  }

  deleteEntrepot(entrepot: Entrepot) {
    Swal.fire({
      title: 'Confirmation',
      text: `Are you sure you want to delete ${entrepot.libelle}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.entrep.deleteEntrepot(entrepot).then(() => {
          Swal.fire('Deleted!', `${entrepot.libelle} has been deleted.`, 'success');
          // After successful deletion, you may want to refresh the data in the component.
          this.getAllEntrepot();
        }).catch((error) => {
          Swal.fire('Error!', `An error occurred while deleting ${entrepot.libelle}: ${error.message}`, 'error');
        });
      }
    });
  }
  goToEntrepotDetails(id: string) {
    this.router.navigate(['/detail', id]).then(r => console.log(r));
  }
  goToEntrepotModify(id: string) {
    this.router.navigate(['/update', id]).then(r => console.log(r));
  }
}
