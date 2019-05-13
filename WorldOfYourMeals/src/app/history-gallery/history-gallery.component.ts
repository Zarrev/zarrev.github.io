import {AfterViewInit, Component, OnDestroy, OnInit, TemplateRef} from '@angular/core';
import {CarouselConfig} from 'ngx-bootstrap/carousel';
import {BsModalService, BsModalRef} from 'ngx-bootstrap/modal';
import * as $ from 'jquery';
import {Meal} from '../meal.interface';
import {DomSanitizer, SafeStyle} from '@angular/platform-browser';
import {MealService} from '../meal.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-history-gallery',
  templateUrl: './history-gallery.component.html',
  styleUrls: ['./history-gallery.component.scss'],
  providers: [
    {provide: CarouselConfig, useValue: {noPause: true, showIndicators: true}}
  ]
})
export class HistoryGalleryComponent implements OnInit, OnDestroy, AfterViewInit {
  private _modalRef: BsModalRef;
  private _selectedMeal: Meal;
  private firstActive = this.route.snapshot.paramMap.get('id');
  activeSlideIndex: number;

  constructor(private modalService: BsModalService, private sanitizer: DomSanitizer,
              private mealService: MealService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    const navbarHeight = 56;
    $(window).on('resize', () => {
      Array.prototype.forEach.call(document.getElementsByClassName('img-style'), (element) => {
        element.style.height = (Math.max(document.documentElement.clientHeight, window.innerHeight || 0) - navbarHeight) + 'px';
      });
    });
    $('body').css('background-image', 'url(assets/img/samples/background.jpg)');
  }

  ngAfterViewInit(): void {
    this.setActive();
  }

  openModal(template: TemplateRef<any>, img: Meal) {
    this._selectedMeal = img;
    this._modalRef = this.modalService.show(template, Object.assign({}, {class: 'modal-lg'}));
  }

  get style(): SafeStyle {
    const navbarHeight = 56;
    return this.sanitizer.bypassSecurityTrustStyle('height: ' +
      (Math.max(document.documentElement.clientHeight, window.innerHeight || 0) - navbarHeight) + 'px');
  }

  get modalRef(): BsModalRef {
    return this._modalRef;
  }

  get meals(): Meal[] {
    return this.mealService.meals;
  }

  get selectedMeal(): Meal {
    return this._selectedMeal;
  }

  get getFirstActive() {
    return this.firstActive;
  }

  ngOnDestroy(): void {
    $('body').css('background-image', '');
  }

  setActive() {
    for (let i = 0; i < this.meals.length; i++) {
      if (this.meals[i].$key === this.firstActive) {
        this.activeSlideIndex = i;
        return;
      }
    }
    this.activeSlideIndex = 0;
  }

  onChange(event: number) {
    this.router.navigate(['/history_gallery', this.mealService.meals[event].$key]);
  }

  jump() {
    this.mealService.setMealFitBound(true, this.selectedMeal);
    this.modalRef.hide();
    this.router.navigate(['/history']);
  }

  isOnline() {
    return !!window.navigator.onLine;
  }

  remove(key: string) {
    this.modalRef.hide();
    this.mealService.removeMeal(key);
  }
}
