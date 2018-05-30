import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OidcConfigService, OidcSecurityService, AuthorizationResult } from 'angular-auth-oidc-client';

@Component({
  selector: 'app-authorized',
  templateUrl: './authorized.component.html',
  styleUrls: ['./authorized.component.scss']
})
export class AuthorizedComponent implements OnInit {

  constructor(private router: Router, private oidcSecurityService: OidcSecurityService) { }

  ngOnInit() {
    this.oidcSecurityService.onAuthorizationResult.subscribe(
      (authorizationResult: AuthorizationResult) => {
        this.onAuthorizationResultComplete(authorizationResult);
      });
  }

  private onAuthorizationResultComplete(authorizationResult: AuthorizationResult): void {
    console.log('Auth result received:' + authorizationResult);
    if (authorizationResult === AuthorizationResult.unauthorized) {
      if (window.parent) {
        // sent from the child iframe, for example the silent renew
        window.parent.location.href = '/unauthorized';
      } else {
        // sent from the main window
        window.location.href = '/unauthorized';
      }
    } else {
      this.router.navigate(['/dashboard/home']);
    }
  }
}
