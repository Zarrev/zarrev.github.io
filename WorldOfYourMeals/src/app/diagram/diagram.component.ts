import { Component, OnInit } from '@angular/core';
import * as CanvasJS from 'src/assets/scripts/canvasjs/canvasjs.min.js';

@Component({
  selector: 'app-diagram',
  templateUrl: './diagram.component.html',
  // styleUrls: ['./diagram.component.scss']
})
export class DiagramComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const chart = new CanvasJS.Chart('chartContainer', {
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: 'Basic Column Chart in Angular',
        titleMaxWidth: 100,
      },
      dataPointWidth: 10,
      data: [{
        type: 'column',
        dataPoints: [
          { y: 71, label: 'Apple' },
          { y: 55, label: 'Mango' },
          { y: 50, label: 'Orange' },
          { y: 65, label: 'Banana' },
          { y: 95, label: 'Pineapple' },
          { y: 68, label: 'Pears' },
          { y: 28, label: 'Grapes' }
        ]
      }]
    });
    // chart.renderRangeBar(5);
    chart.render();
  }

}
