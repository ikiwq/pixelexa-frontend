import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleCardXlComponent } from './article-card-xl.component';

describe('ArticleCardXlComponent', () => {
  let component: ArticleCardXlComponent;
  let fixture: ComponentFixture<ArticleCardXlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleCardXlComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArticleCardXlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
