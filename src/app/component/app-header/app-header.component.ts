import { Component, OnInit } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { AuthService } from '../../services/auth.service';
import { EventsService } from '../../services/events.service';
import { CoreService } from '../../services/core.service';

@Component({
  selector: 'app-app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit {
  username = '';
  email = '';
  location = '';
  title = '';

  constructor(private oidcSecurityService: OidcSecurityService,
    private authService: AuthService,
    private eventsService: EventsService,
    private coreService: CoreService,
  ) {
      this.coreService.getAppConfig('header_title').then( title => {
        this.title = title;
      });
    }

  ngOnInit() {
    this.oidcSecurityService.getUserData().subscribe(
      (userData: any) => {
        this.username = userData.username;
        this.email = userData.email;
        this.location = userData.location;
      });
  }

  logout(): void {
    this.authService.revokeToken();
    this.authService.removeRedirectUrl();
    this.oidcSecurityService.logoff();
  }

  private setUserData() {
    this.username = sessionStorage.getItem('userData')['username'];
  }
}
