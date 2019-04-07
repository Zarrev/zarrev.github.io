import {Component, OnInit} from '@angular/core';
import {ScrollerService} from '../scroller.service';

@Component({
  selector: 'app-scroller',
  templateUrl: './scroller.component.html',
  styleUrls: ['./scroller.component.scss']
})
export class ScrollerComponent implements OnInit {

  constructor(public scrollerService: ScrollerService) {
  }

  ngOnInit() {
    this.scrollerService.findImageElement();
    this.scrollerService.scrollListener();
  }
}
