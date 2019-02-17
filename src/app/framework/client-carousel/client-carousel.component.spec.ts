import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientCarouselComponent } from './client-carousel.component';

describe('ClientCarouselComponent', () => {
  let component: ClientCarouselComponent;
  let fixture: ComponentFixture<ClientCarouselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientCarouselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
