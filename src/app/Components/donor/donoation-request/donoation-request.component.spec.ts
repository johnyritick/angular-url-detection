import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonoationRequestComponent } from './donoation-request.component';

describe('DonoationRequestComponent', () => {
  let component: DonoationRequestComponent;
  let fixture: ComponentFixture<DonoationRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DonoationRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DonoationRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
