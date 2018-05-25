import { Component, OnInit, OnDestroy } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-unauthorized',
  templateUrl: './unauthorized.component.html',
  styleUrls: ['./unauthorized.component.scss']
})
export class UnauthorizedComponent implements OnInit {

  constructor(private oidcSecurityService: OidcSecurityService, private titleService: Title) {

  }

  ngOnInit() {
    this.titleService.setTitle('401 - NOT AUTHORIZED');
  }

  login() {
    this.oidcSecurityService.authorize();
  }
}
