import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatsListViewComponent } from './chats-list-view.component';

describe('ChatsListViewComponent', () => {
  let component: ChatsListViewComponent;
  let fixture: ComponentFixture<ChatsListViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatsListViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatsListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
