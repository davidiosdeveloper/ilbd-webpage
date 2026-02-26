import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Petitions } from './petitions';

describe('Petitions', () => {
  let component: Petitions;
  let fixture: ComponentFixture<Petitions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Petitions]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Petitions);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
