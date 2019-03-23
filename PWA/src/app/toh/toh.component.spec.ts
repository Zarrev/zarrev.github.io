import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TohComponent } from './toh.component';

describe('TohComponent', () => {
  let component: TohComponent;
  let fixture: ComponentFixture<TohComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TohComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TohComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
