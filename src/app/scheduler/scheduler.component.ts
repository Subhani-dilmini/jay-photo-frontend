// scheduler.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarModule, CalendarView } from 'angular-calendar';

@Component({
  selector: 'app-scheduler',
  standalone: true,
  imports: [CommonModule, CalendarModule],
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.scss']
})
export class SchedulerComponent {
  view: CalendarView = CalendarView.Week;
  viewDate: Date = new Date();
  events = [
    {
      start: new Date(),
      title: 'An event',
    },
  ];
}
