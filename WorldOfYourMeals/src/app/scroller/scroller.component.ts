import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-scroller',
  templateUrl: './scroller.component.html',
  styleUrls: ['./scroller.component.scss']
})
export class ScrollerComponent implements OnInit {

  private clicked = false;

  constructor() { }

  ngOnInit() {
  }

  private scrollUp() {
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
  }

  private scrollToView(target: string) {
    document.getElementById(target).scrollIntoView({behavior: 'smooth'});
  }

  scrollFunc(target: string) {
    const img = document.getElementById('arrow');
    img.setAttribute('style', 'filter: invert(100%); transform: rotate(180deg);');
    if (this.clicked) {
      this.scrollToView(target);
      return;
    }
    this.scrollUp();
  }
}
