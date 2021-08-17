import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationRefComponent } from './location-ref.component';

describe('LocationRefComponent', () => {
  let component: LocationRefComponent;
  let fixture: ComponentFixture<LocationRefComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocationRefComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationRefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
