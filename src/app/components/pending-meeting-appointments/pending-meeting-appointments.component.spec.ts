import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingMeetingAppointmentsComponent } from './pending-meeting-appointments.component';

describe('PendingMeetingAppointmentsComponent', () => {
  let component: PendingMeetingAppointmentsComponent;
  let fixture: ComponentFixture<PendingMeetingAppointmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PendingMeetingAppointmentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PendingMeetingAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
