import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExploreArticlesPageComponent } from './explore-articles-page.component';

describe('ExploreArticlesPageComponent', () => {
  let component: ExploreArticlesPageComponent;
  let fixture: ComponentFixture<ExploreArticlesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExploreArticlesPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExploreArticlesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
