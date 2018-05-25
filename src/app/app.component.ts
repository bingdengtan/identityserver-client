import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { EventEmitter } from 'events';

import { CoreService } from './services/core.service';

import {
    OidcSecurityService,
    AuthorizationResult
} from 'angular-auth-oidc-client';

import { AuthService } from './services/auth.service';
import { EventsService } from './services/events.service';
import { Output } from '@angular/core/src/metadata/directives';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit  {
    isAuthorized = false;
    userData: any;

    constructor(
        private oidcSecurityService: OidcSecurityService,
        private authService: AuthService,
        private eventsService: EventsService,
        private titleService: Title,
        private coreService: CoreService
    ) {
        this.coreService.getAppConfig('app_name').then( title => {
            this.titleService.setTitle(title);
        });

        if (this.oidcSecurityService.moduleSetup) {
            this.doCallbackLogicIfRequired();
        } else {
            this.oidcSecurityService.onModuleSetup.subscribe(() => {
                this.doCallbackLogicIfRequired();
            });
        }
    }

    ngOnInit(): void {
        this.oidcSecurityService.getIsAuthorized().subscribe(
            (isAuthorized: boolean) => {
                this.isAuthorized = isAuthorized;
            });

        this.oidcSecurityService.getUserData().subscribe(
            (userData: any) => {
                this.userData = userData;
            });
    }

    private doCallbackLogicIfRequired(): void {
        if (window.location.hash || window.location.search) {
            // Only for production.
            if (window.location.search.match(/\^?i=/) == null) {
                this.oidcSecurityService.authorizedCallback();
            }
        }
    }
}
