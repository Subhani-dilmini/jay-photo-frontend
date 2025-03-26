import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReqMeetingAppointmentComponent } from './req-meeting-appointment.component';

describe('ReqMeetingAppointmentComponent', () => {
  let component: ReqMeetingAppointmentComponent;
  let fixture: ComponentFixture<ReqMeetingAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReqMeetingAppointmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReqMeetingAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
