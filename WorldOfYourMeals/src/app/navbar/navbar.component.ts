import {Component, Input, OnInit} from '@angular/core';
import {ScrollerService} from '../scroller.service';
import {AuthorizationService} from '../authorization.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Input() title: string;

  constructor(public scrollerService: ScrollerService, public authorizationService: AuthorizationService) {
  }

  ngOnInit() {
    this.authorizationService.authorizationState.subscribe(user => {
      this.authorizationService.setUser = user;
      this.authorizationService.setLoggedIn = user != null;
    });
    // this.togglerCollaps();
  }

  // a sötétmágia minden erejével ellenem van, így ez a funkció nem működik
  // private togglerCollaps(): void {
  //   const toggler = $('.navbar-toggler.btn-sm');
  //   console.log(toggler);
  //   $('.nav-link').on('click', () => {
  //     if ($(this).css('display') !== 'none') {
  //       toggler.get(0).click(); // trigger( 'click' );
  //       console.log('triggered');
  //     }
  //     console.log('tried');
  //   });
  // }
}
