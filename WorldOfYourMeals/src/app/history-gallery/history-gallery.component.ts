import {Component, OnDestroy, OnInit} from '@angular/core';
import { CarouselConfig } from 'ngx-bootstrap/carousel';
import * as $ from 'jquery';

@Component({
  selector: 'app-history-gallery',
  templateUrl: './history-gallery.component.html',
  styleUrls: ['./history-gallery.component.scss'],
  providers: [
    { provide: CarouselConfig, useValue: {noPause: true, showIndicators: true } }
  ]
})
export class HistoryGalleryComponent implements OnInit, OnDestroy {

  constructor() { }

  ngOnInit() {
    const navbarHeight = 56; // document.getElementById('navbar').clientHeight ;
    Array.prototype.forEach.call(document.getElementsByClassName('img-style'), (element) => {
      element.style.height = (Math.max(document.documentElement.clientHeight, window.innerHeight || 0) - navbarHeight) + 'px';
    });
    $(window).on('resize', () => {
      Array.prototype.forEach.call(document.getElementsByClassName('img-style'), (element) => {
        element.style.height = (Math.max(document.documentElement.clientHeight, window.innerHeight || 0) - navbarHeight) + 'px';
      });
    });
    document.body.style.backgroundImage = 'url("assets/img/samples/background.jpg")';
  }

  ngOnDestroy(): void {
    document.body.style.backgroundImage = '';
  }
}
