import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputContainerComponent } from './input-container.component';

describe('InputContainerComponent', () => {
  let component: InputContainerComponent;
  let fixture: ComponentFixture<InputContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
