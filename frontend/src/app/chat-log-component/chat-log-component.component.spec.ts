import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatLogComponentComponent } from './chat-log-component.component';

describe('ChatLogComponentComponent', () => {
  let component: ChatLogComponentComponent;
  let fixture: ComponentFixture<ChatLogComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatLogComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatLogComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
