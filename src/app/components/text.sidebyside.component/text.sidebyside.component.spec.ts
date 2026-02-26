import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextSidebysideComponent } from './text.sidebyside.component';

describe('TextSidebysideComponent', () => {
  let component: TextSidebysideComponent;
  let fixture: ComponentFixture<TextSidebysideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextSidebysideComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextSidebysideComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
