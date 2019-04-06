import {Component, Input, OnInit} from '@angular/core';
import { AuthComponent } from '../auth/auth.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Input() title: string;

  constructor() { }

  ngOnInit() {
  }

  signIn() {
    alert('Not implemented.');
  }
}
