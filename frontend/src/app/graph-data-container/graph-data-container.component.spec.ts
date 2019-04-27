import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphDataContainerComponent } from './graph-data-container.component';

describe('GraphDataContainerComponent', () => {
  let component: GraphDataContainerComponent;
  let fixture: ComponentFixture<GraphDataContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphDataContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphDataContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
