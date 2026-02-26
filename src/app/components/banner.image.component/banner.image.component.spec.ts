import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerImageComponent } from './banner.image.component';

describe('BannerImageComponent', () => {
  let component: BannerImageComponent;
  let fixture: ComponentFixture<BannerImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BannerImageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BannerImageComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
