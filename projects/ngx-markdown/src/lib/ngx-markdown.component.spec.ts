import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxMarkdownComponent } from './ngx-markdown.component';

describe('NgxMarkdownComponent', () => {
  let component: NgxMarkdownComponent;
  let fixture: ComponentFixture<NgxMarkdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxMarkdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxMarkdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
