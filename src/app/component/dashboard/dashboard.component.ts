import {Component, Input, OnInit} from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import {Entrepot} from "../../model/entrepot.model";
import {ActivatedRoute, Router} from "@angular/router";
import {EntrepotService} from "../entrepot/entrepot.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css', '../../../assets/libs/datatables.scss']
})
export class DashboardComponent implements OnInit {
  @Input() editLink = 'update';
    entrepot: Entrepot[] = [];
  studentObj: Entrepot = {
    id: '',
    name: '',
    address: '',
    capacity: '',
    stock: '',
  };
  id: string = '';
  name: string = '';
  address: string = '';
  stock: string = '';
  capacity: string = ''

  constructor(private auth: AuthService, private entrep: EntrepotService, private router: Router,
              private route: ActivatedRoute) { }

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
    if (window.confirm('Are you sure you want to delete ' + entrepot.name + ' ' + ' ?')) {
      this.entrep.deleteEntrepot(entrepot);
    }
  }
  goToEntrepotDetails(id: string) {
    this.router.navigate(['/update', id]).then(r => console.log(r));
  }
}
