import {NgModule} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {entrepotRoute} from './entrepot.route';
import {EntrepotComponent} from "./entrepot.component";

@NgModule({
  declarations: [
    EntrepotComponent,
  ],
    imports: [
        CommonModule,
        RouterModule.forChild(entrepotRoute),
        NgxDatatableModule,
        NgbModule,
        ReactiveFormsModule,
        FormsModule,
    ],
  exports: [RouterModule],
})
export class EntrepotModule {
}
