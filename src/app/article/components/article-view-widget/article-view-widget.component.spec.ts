import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleViewWidgetComponent } from './article-view-widget.component';

describe('ArticleViewWidgetComponent', () => {
  let component: ArticleViewWidgetComponent;
  let fixture: ComponentFixture<ArticleViewWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleViewWidgetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArticleViewWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
