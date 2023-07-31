import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntrepotDetailComponent } from './entrepot-detail.component';

describe('EntrepotDetailComponent', () => {
  let component: EntrepotDetailComponent;
  let fixture: ComponentFixture<EntrepotDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntrepotDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntrepotDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
