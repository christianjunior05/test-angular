import { Component, OnInit } from '@angular/core';
import {Entrepot} from "../../model/entrepot.model";
import {Input} from '@angular/core';

@Component({
  selector: 'app-entrepot',
  templateUrl: './entrepot.component.html',
  styleUrls: ['./entrepot.component.css']
})
export class EntrepotComponent implements OnInit {
  @Input() editLink = 'update';
  columnMode: any;
  entrepot: Entrepot [] = [] ;



  constructor() { }

  ngOnInit(): void {
  }

}
