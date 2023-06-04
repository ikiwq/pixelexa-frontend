import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatProfileViewComponent } from './chat-profile-view.component';

describe('ChatProfileViewComponent', () => {
  let component: ChatProfileViewComponent;
  let fixture: ComponentFixture<ChatProfileViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatProfileViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatProfileViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
