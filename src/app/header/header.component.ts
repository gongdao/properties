import { Component, OnInit, OnDestroy, Input, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@ Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy{

  userIsAuthenticated = false;
  private authListenerSubs: Subscription;
  private roleUpdateListenerSubs: Subscription;
  userName = 'use';
  role = 0;

  constructor(private authService: AuthService ) { }

  ngOnInit() {

    this .authListenerSubs = this .authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userName = localStorage.getItem('userName');
        // console.log('The user is ' + this.userName);
        this.role = this.authService.getUserRole();
        this .userIsAuthenticated = isAuthenticated;

        // console.log('this.userName is ' + this.userName);
    });
  }
  onLogout() {
    this .userName = '';
    this . role = 0;
    this .authService.logout();
    this.authService.navigate(0);
  }
  ngOnDestroy() {
    this .authListenerSubs.unsubscribe();
    this.roleUpdateListenerSubs.unsubscribe();
  }
}
