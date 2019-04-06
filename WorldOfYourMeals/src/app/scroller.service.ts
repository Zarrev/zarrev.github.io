import {Injectable} from '@angular/core';
import {passBoolean} from 'protractor/built/util';

@Injectable({
  providedIn: 'root'
})
export class ScrollerService {

  private clicked = false;
  private lastScrollTop = pageYOffset;
  private img: HTMLElement;
  private hiddenElement: HTMLElement;
  private isVisible = false;

  constructor() {
  }

  findImageElement(): void {
    this.img = document.getElementById('arrow');
    this.hiddenElement = document.getElementById('scrollerdiv');
  }

  private scrollUp() {
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
  }

  private scrollToView(target: string) {
    document.getElementById(target).scrollIntoView({behavior: 'smooth'});
  }

  scrollFunc(target: string) {
    if (this.clicked) {
      this.scrollUp();
      this.clicked = false;
      return;
    }
    this.scrollToView(target);
    this.clicked = true;
  }

  private applyChangeOfScroller() {
    const st = window.pageYOffset || document.documentElement.scrollTop;
    const height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

    if (st >= height / 4 && !this.isVisible) {
      this.hiddenElement.setAttribute('style', 'display: initial;');
      this.isVisible = true;
    } else if (st < height / 4 && this.isVisible) {
      this.hiddenElement.setAttribute('style', 'display: none;');
      this.isVisible = false;
    }

    if (this.lastScrollTop > 10 * this.img.offsetTop) {
      this.clicked = true;
      this.img.setAttribute('style', 'filter: invert(100%);   transform: rotate(180deg);');
    } else {
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
