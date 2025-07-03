// src/app/components/session-table/session-table.component.ts
import { Component, OnInit } from '@angular/core';
import { ReportService } from '../../services/report.service';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-session-table',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: 'session-table.component.html',
  styles: [`
    table { width: 100%; }
    th.mat-header-cell { font-weight: bold; }
  `]
})
export class SessionTableComponent implements OnInit {
  dataSource: any[] = [];
  displayedColumns: string[] = ['date', 'amount', 'packageName', 'place', 'paymentStatus', 'sessionStatus'];

  constructor(private apiService: ReportService) {}

  ngOnInit() {
    this.apiService.getSessionSummary().subscribe((data:any) => {
      this.dataSource = data;
    });
  }
}
