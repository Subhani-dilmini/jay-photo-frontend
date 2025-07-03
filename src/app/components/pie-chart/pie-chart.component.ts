// src/app/components/pie-chart/pie-chart.component.ts
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ReportService } from '../../services/report.service';
import { Chart, ChartConfiguration, ChartData, registerables } from 'chart.js'; // Import registerables

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [], // No additional imports needed
  templateUrl: 'pie-chart.component.html',
  styles: [`canvas { max-width: 100%; height: auto; }`]
})
export class PieChartComponent implements AfterViewInit {
  @ViewChild('pieChart') pieChartRef!: ElementRef<HTMLCanvasElement>;
  private chart: any | undefined;

  constructor(private apiService: ReportService) {
    // Register all controllers and elements
    Chart.register(...registerables);
  }

  ngAfterViewInit() {
    this.apiService.getMeetingStatusCount().subscribe(data => {
      if (this.chart) this.chart.destroy(); // Destroy previous chart if exists
      const ctx = this.pieChartRef.nativeElement.getContext('2d');
      if (ctx) {
        const chartData: ChartData<'pie', number[], string> = {
          labels: data.map(item => item.status),
          datasets: [{
            data: data.map(item => item.count),
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'], // Distinct colors
            hoverOffset: 4
          }]
        };

        const chartConfig: ChartConfiguration<'pie', number[], string> = {
          type: 'pie',
          data: chartData,
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              title: { display: true, text: 'Meeting Status Distribution' }
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
