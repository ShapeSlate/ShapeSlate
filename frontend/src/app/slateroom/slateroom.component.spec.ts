import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlateRoomComponent } from './slateroom.component';

describe('SlateRoomComponent', () => {
  let component: SlateRoomComponent;
  let fixture: ComponentFixture<SlateRoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlateRoomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlateRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
