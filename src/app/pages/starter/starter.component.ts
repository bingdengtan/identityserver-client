import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-starter',
  templateUrl: './starter.component.html',
  styleUrls: ['./starter.component.scss']
})
export class StarterComponent implements OnInit {
  isAuthorized = false;

  constructor(private router: Router, private oidcSecurityService: OidcSecurityService) {
  }

  ngOnInit() {
    this.checkLogin();
  }

  checkLogin(): void {
    this.oidcSecurityService.authorize();
  }
}
