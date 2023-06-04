import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationObserverComponent } from './pagination-observer.component';

describe('PaginationObserverComponent', () => {
  let component: PaginationObserverComponent;
  let fixture: ComponentFixture<PaginationObserverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginationObserverComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginationObserverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
