import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotographerAccountComponent } from './photographer-account.component';

describe('PhotographerAccountComponent', () => {
  let component: PhotographerAccountComponent;
  let fixture: ComponentFixture<PhotographerAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhotographerAccountComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhotographerAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
