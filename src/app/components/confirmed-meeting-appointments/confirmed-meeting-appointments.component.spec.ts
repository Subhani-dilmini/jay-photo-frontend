import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmedMeetingAppointmentsComponent } from './confirmed-meeting-appointments.component';

describe('ConfirmedMeetingAppointmentsComponent', () => {
  let component: ConfirmedMeetingAppointmentsComponent;
  let fixture: ComponentFixture<ConfirmedMeetingAppointmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmedMeetingAppointmentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmedMeetingAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
