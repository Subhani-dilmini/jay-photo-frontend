// src/app/components/bar-graph/bar-graph.component.ts
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ReportService } from '../../services/report.service';
import { Chart, ChartConfiguration, ChartData, registerables } from 'chart.js';

@Component({
  selector: 'app-bar-graph',
  standalone: true,
  imports: [], // No additional imports needed
  templateUrl: 'bar-graph.component.html',
  styles: [`canvas { max-width: 100%; height: auto; }`]
})
export class BarGraphComponent implements AfterViewInit {
  @ViewChild('barChart') barChartRef!: ElementRef<HTMLCanvasElement>;
  private chart: Chart | undefined;

  constructor(private apiService: ReportService) {
    // Register all controllers and elements
    Chart.register(...registerables);
  }

  ngAfterViewInit() {
    this.apiService.getSessionSummary().subscribe(data => {
      if (this.chart) this.chart.destroy(); // Destroy previous chart if exists
      const months = data.map(item => item.date.substring(0, 7)); // YYYY-MM
      const counts: Record<string, number> = {}; // Explicitly type as Record<string, number>
      months.forEach(m => counts[m] = (counts[m] || 0) + 1);
      const ctx = this.barChartRef.nativeElement.getContext('2d');
      if (ctx) {
        const chartData: ChartData<'bar', number[], string> = {
          labels: Object.keys(counts),
          datasets: [{
            label: 'Sessions by Month',
            data: Object.values(counts),
            backgroundColor: '#36A2EB', // Distinct color
            borderColor: '#36A2EB',
            borderWidth: 1
          }]
        };

        const chartConfig: ChartConfiguration<'bar', number[], string> = {
          type: 'bar',
          data: chartData,
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: { y: { beginAtZero: true, title: { display: true, text: 'Count' } } },
            plugins: {
              title: { display: true, text: 'Sessions by Month' }
            }
          }
        };

        this.chart = new Chart(ctx, chartConfig);
      }
    });
  }

  ngOnDestroy() {
    if (this.chart) this.chart.destroy(); // Cleanup on component destroy
  }
}
