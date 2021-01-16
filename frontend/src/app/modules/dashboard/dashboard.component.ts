import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import { IStatistic } from 'src/app/shared/model/dashboard.model';

// core components
import { chartOptions, parseOptions, chartExample1, chartExample2 } from '../../shared/variables/charts';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  public datasets: any;
  public data: any;
  public salesChart;
  public clicked = true;
  public clicked1 = false;
  public counts: IStatistic;
  constructor(private service: DashboardService) {}

  ngOnInit() {

    this.service.getStatistic().subscribe(res=>{
      this.counts = res.body;
    })

    this.datasets = [
      [0, 20, 10, 30, 15, 40, 20, 60, 60],
      [0, 20, 5, 25, 10, 30, 15, 40, 40],
    ];
    this.data = this.datasets[0];

    const chartOrders = document.getElementById('chart-orders');

    parseOptions(Chart, chartOptions());

    const ordersChart = new Chart(chartOrders, {
      type: 'bar',
      options: chartExample2.options,
      data: chartExample2.data,
    });

    const chartSales = document.getElementById('chart-sales');

    this.salesChart = new Chart(chartSales, {
      type: 'line',
      options: chartExample1.options,
      data: chartExample1.data,
    });
  }

  public updateOptions() {
    this.salesChart.data.datasets[0].data = this.data;
    this.salesChart.update();
  }
}
