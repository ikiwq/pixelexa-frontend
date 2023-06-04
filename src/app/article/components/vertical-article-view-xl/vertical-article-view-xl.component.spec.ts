import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerticalArticleViewXlComponent } from './vertical-article-view-xl.component';

describe('VerticalArticleViewXlComponent', () => {
  let component: VerticalArticleViewXlComponent;
  let fixture: ComponentFixture<VerticalArticleViewXlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerticalArticleViewXlComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerticalArticleViewXlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
