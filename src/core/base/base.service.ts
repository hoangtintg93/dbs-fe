import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http';
import { Router } from '@angular/router';
import { ErrorResponse } from './error.response';
import { REGEX, DATETIME_PATTERN } from '../constants/index';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

export class BaseService {
  public handleError(error: Response, router: Router) {
    if (error.status === 401) {

    } else {
      let applicationError = error.headers.get('Application-Error');
      let serverError = error.json();
      let modelStateErrors = '';

      if (!serverError.type) {
        console.log(serverError);
        for (let key in serverError) {
          if (serverError[key]) {
            modelStateErrors += serverError[key] + '\n';
          }
        }
      }
      modelStateErrors = modelStateErrors = '' ? null : modelStateErrors;
      return Observable.throw(applicationError || modelStateErrors || 'Server error');
    }
  }

  public convertDateStringsToDates(input: any) {
    // Ignore things that aren't objects.
    if (typeof input !== 'object') {
      return input;
    }

    for (let key in input) {
      if (!input.hasOwnProperty(key)) {
        continue;
      }
      let value = input[key];
      let match;
      // Check for string properties which look like dates.
      if (typeof value === 'string' && (match = value.match(REGEX.ISO6801))) {
        let date = new Date(value);
        let userTimezoneOffset = new Date().getTimezoneOffset() * 60000;
        input[key] = new Date(date.getTime() + userTimezoneOffset);
      } else if (typeof value === 'object') {
        // Recurse into object
        this.convertDateStringsToDates(value);
      }
    }
  }

  public convertDateToString(input: any) {
    if (typeof input !== 'object') {
      return input;
    }

    // tslint:disable-next-line:forin
    for (let key in input) {
      let value = input[key];
      let match;
      // Check for string properties which look like dates.
      if (value instanceof Date) {
        let date = new Date(value);
        let userTimezoneOffset = new Date().getTimezoneOffset() * 60000;
        input[key] = new Date(date.getTime() - userTimezoneOffset);
        // input[key] = dateTimePipe.transform(value, DateTimePattern.SentBackEndFormat);
      } else if (typeof value === 'object') {
        // Recurse into object
        this.convertDateToString(value);
      }
    }
  }
}

