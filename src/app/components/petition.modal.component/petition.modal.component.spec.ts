import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetitionModalComponent } from './petition.modal.component';

describe('PetitionModalComponent', () => {
  let component: PetitionModalComponent;
  let fixture: ComponentFixture<PetitionModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PetitionModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PetitionModalComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
