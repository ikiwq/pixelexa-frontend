import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorizontalArticleViewComponent } from './horizontal-article-view.component';

describe('HorizontalArticleViewComponent', () => {
  let component: HorizontalArticleViewComponent;
  let fixture: ComponentFixture<HorizontalArticleViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HorizontalArticleViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HorizontalArticleViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
