import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpcomingSessionAppointmentsComponent } from './upcoming-session-appointments.component';

describe('UpcomingSessionAppointmentsComponent', () => {
  let component: UpcomingSessionAppointmentsComponent;
  let fixture: ComponentFixture<UpcomingSessionAppointmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpcomingSessionAppointmentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpcomingSessionAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
