import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CanvasblobComponent } from './canvasblob.component';

describe('CanvasblobComponent', () => {
  let component: CanvasblobComponent;
  let fixture: ComponentFixture<CanvasblobComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CanvasblobComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CanvasblobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
