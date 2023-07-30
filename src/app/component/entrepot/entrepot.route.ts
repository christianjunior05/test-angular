import {Injectable} from '@angular/core';
import {Resolve, Routes} from '@angular/router';
import {Entrepot} from '../../model/entrepot.model';
import {EntrepotComponent} from "./entrepot.component";
import {EntrepotService} from "./entrepot.service";
import {EntrepotUpdateComponent} from "./entrepot-update/entrepot-update.component";

export let entrepotRoute: Routes;
entrepotRoute = [
  {
    path: '',
    component: EntrepotComponent,
    data: {
      defaultSort: 'id,asc',
    },
  },

  {
    path: 'detail/:id',
    component: EntrepotUpdateComponent,
  },

  {
    path: 'new',
    component: EntrepotUpdateComponent,
  },

  {
    path: 'update/:id',
    component: EntrepotUpdateComponent,
  }
];
