import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PastSessionComponent } from './past-session.component';

describe('PastSessionComponent', () => {
  let component: PastSessionComponent;
  let fixture: ComponentFixture<PastSessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PastSessionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PastSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
