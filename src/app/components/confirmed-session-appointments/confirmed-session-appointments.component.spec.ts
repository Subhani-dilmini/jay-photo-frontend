import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmedSessionAppointmentsComponent } from './confirmed-session-appointments.component';

describe('ConfirmedSessionAppointmentsComponent', () => {
  let component: ConfirmedSessionAppointmentsComponent;
  let fixture: ComponentFixture<ConfirmedSessionAppointmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmedSessionAppointmentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmedSessionAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
