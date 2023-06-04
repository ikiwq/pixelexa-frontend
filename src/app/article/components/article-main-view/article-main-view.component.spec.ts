import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleMainViewComponent } from './article-main-view.component';

describe('ArticleMainViewComponent', () => {
  let component: ArticleMainViewComponent;
  let fixture: ComponentFixture<ArticleMainViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleMainViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArticleMainViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
