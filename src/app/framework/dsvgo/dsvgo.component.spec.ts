import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DSVGOComponent } from './dsvgo.component';

describe('DSVGOComponent', () => {
  let component: DSVGOComponent;
  let fixture: ComponentFixture<DSVGOComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DSVGOComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DSVGOComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
