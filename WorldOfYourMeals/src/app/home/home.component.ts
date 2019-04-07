import {Component, Input, OnInit} from '@angular/core';
import {AuthorizationService} from '../authorization.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @Input() title: string;

  constructor(public authorizationService: AuthorizationService) {
  }

  ngOnInit() {}

}
