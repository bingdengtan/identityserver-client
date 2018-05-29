import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { environment } from '../../environments/environment';
import 'rxjs/Rx';

import { CoreUtils } from '../utils/core.utils';

@Injectable()
export class RoleService {
    resetUrl = 'role';
    constructor(public http: Http, public coreUtils: CoreUtils) {
        this.resetUrl = environment.api + this.resetUrl;
    }

    save(role: any): Promise<any> {
      return new Promise((resolve, reject) => {
        this.http.post(this.resetUrl + '/create', role)
          .toPromise()
          .then( response => {
            resolve(response.json());
          })
          .catch(e => {
            reject(e);
          });
      });
    }

    delete(ids: Array<string>): Promise<any> {
      return new Promise((resolve, reject) => {
        this.http.post(this.resetUrl + '/delete', {ids: ids})
          .toPromise()
          .then( response => {
            resolve(response.json());
          })
          .catch(e => {
            reject(e);
          });
      });
    }
}
