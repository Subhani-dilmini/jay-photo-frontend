import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReqSessoinAppointmentComponent } from './req-sessoin-appointment.component';

describe('ReqSessoinAppointmentComponent', () => {
  let component: ReqSessoinAppointmentComponent;
  let fixture: ComponentFixture<ReqSessoinAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReqSessoinAppointmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReqSessoinAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
