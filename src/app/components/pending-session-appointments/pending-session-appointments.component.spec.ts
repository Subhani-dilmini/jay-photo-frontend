import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingSessionAppointmentsComponent } from './pending-session-appointments.component';

describe('PendingSessionAppointmentsComponent', () => {
  let component: PendingSessionAppointmentsComponent;
  let fixture: ComponentFixture<PendingSessionAppointmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PendingSessionAppointmentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PendingSessionAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
