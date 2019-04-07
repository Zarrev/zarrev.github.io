import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScrollerService {

  private clicked = false;
  private lastScrollTop = pageYOffset;
  private img: HTMLElement;
  private searchedElement: HTMLElement;
  private isVisible = false;

  constructor() {
  }

  findImageElement(): void {
    this.img = document.getElementById('arrow');
    this.searchedElement = document.getElementById('scrollerdiv');
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

  // iOS-en nem akar tisztességesen működni, ha rámegyek a gombra és még látszik a gomb, nem fordul meg a nyil, nem csúszik, hanem ugrik.
  private applyChangeOfScroller() {
    const st = window.pageYOffset || document.documentElement.scrollTop;
    const height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

    if (st >= height / 4 && !this.isVisible) {
      this.searchedElement.setAttribute('style', 'display: initial;');
      this.isVisible = true;
    } else if (st < height / 4 && this.isVisible) {
      this.searchedElement.setAttribute('style', 'display: none;');
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
