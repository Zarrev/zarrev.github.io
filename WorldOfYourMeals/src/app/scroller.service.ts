import {Injectable} from '@angular/core';
import {passBoolean} from 'protractor/built/util';

@Injectable({
  providedIn: 'root'
})
export class ScrollerService {

  private clicked = false;
  private lastScrollTop = pageYOffset;
  private img: HTMLElement;

  constructor() {
  }

  findImageElement(): void {
    this.img = document.getElementById('arrow');
  }

  private scrollUp() {
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
  }

  private scrollToView(target: string) {
    document.getElementById(target).scrollIntoView({behavior: 'smooth'});
  }

  scrollFunc(target: string) {
    if (this.clicked) {
      this.img.setAttribute('style', 'filter: invert(100%);');
      this.scrollUp();
      this.clicked = false;
      return;
    }
    this.img.setAttribute('style', 'filter: invert(100%);   transform: rotate(180deg);');
    this.scrollToView(target);
    this.clicked = true;
  }

  private applyChangeOfScroller() {
    const st = window.pageYOffset || document.documentElement.scrollTop;
    if (st > this.lastScrollTop) {
      this.clicked = true;
      this.img.setAttribute('style', 'filter: invert(100%);   transform: rotate(180deg);');
    } else if (this.lastScrollTop - this.img.offsetTop <= 0) {
      this.clicked = false;
      this.img.setAttribute('style', 'filter: invert(100%);');
    }
    this.lastScrollTop = st <= 0 ? 0 : st;
  }

  scrollListener() {
    window.addEventListener('scroll', () => {
      this.applyChangeOfScroller();
    });
  }
}
