import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpcomingMeetingAppointmentsComponent } from './upcoming-meeting-appointments.component';

describe('UpcomingMeetingAppointmentsComponent', () => {
  let component: UpcomingMeetingAppointmentsComponent;
  let fixture: ComponentFixture<UpcomingMeetingAppointmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpcomingMeetingAppointmentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpcomingMeetingAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
