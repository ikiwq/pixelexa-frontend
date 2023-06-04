import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryArticlesPageComponent } from './category-articles-page.component';

describe('CategoryArticlesPageComponent', () => {
  let component: CategoryArticlesPageComponent;
  let fixture: ComponentFixture<CategoryArticlesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryArticlesPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryArticlesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
