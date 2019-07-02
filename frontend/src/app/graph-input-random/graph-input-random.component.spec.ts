import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphInputRandomComponent } from './graph-input-random.component';

describe('GraphInputRandomComponent', () => {
  let component: GraphInputRandomComponent;
  let fixture: ComponentFixture<GraphInputRandomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphInputRandomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphInputRandomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
