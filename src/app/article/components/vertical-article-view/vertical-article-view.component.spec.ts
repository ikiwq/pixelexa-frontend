import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerticalArticleViewComponent } from './vertical-article-view.component';

describe('VerticalArticleViewComponent', () => {
  let component: VerticalArticleViewComponent;
  let fixture: ComponentFixture<VerticalArticleViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerticalArticleViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerticalArticleViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
