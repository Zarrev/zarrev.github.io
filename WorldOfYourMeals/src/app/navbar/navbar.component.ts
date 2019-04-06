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

  constructor(public scrollerService: ScrollerService, public authorizationService: AuthorizationService) { }

  ngOnInit() {
  }
}
