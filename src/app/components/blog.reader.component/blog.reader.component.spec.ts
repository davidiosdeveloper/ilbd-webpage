import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogReaderComponent } from './blog.reader.component';

describe('BlogReaderComponent', () => {
  let component: BlogReaderComponent;
  let fixture: ComponentFixture<BlogReaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogReaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogReaderComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
