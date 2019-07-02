import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphInputDropzoneComponent } from './graph-input-dropzone.component';

describe('GraphInputDropzoneComponent', () => {
  let component: GraphInputDropzoneComponent;
  let fixture: ComponentFixture<GraphInputDropzoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphInputDropzoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphInputDropzoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
