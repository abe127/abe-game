import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import * as qs from 'qs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  protected strapiUrl: string = environment.API_URL;

  constructor(protected http: HttpClient) {}

  protected getQueryFilter(queryObject: any) {
    let query = '';
    const keyArray = Object.keys(queryObject);
    const length = keyArray.length;
    keyArray.forEach((key, i) => {
      if (queryObject[key] === '' || queryObject[key] === null) {
        return;
      }
      if (queryObject[key] instanceof Array) {
        if (key === '_or') {
          queryObject[key].forEach((expressions: any, i: number) => {
            if (expressions instanceof Array) {
              expressions.forEach((eachObj: any, j: number) => {
                const uri = `_or[${i}][${j}][${Object.keys(eachObj)[0]}]=${
                  Object.values(eachObj)[0]
                }`;
                query += encodeURI(uri);
                query += '&';
              });
            } else {
              const eachObj = expressions;
              const uri = `_or[${i}][${Object.keys(eachObj)[0]}]=${
                Object.values(eachObj)[0]
              }`;
              query += encodeURI(uri);
              query += '&';
            }
          });
        } else {
          const ObjectArray = queryObject[key];
          for (const eachObj of ObjectArray) {
            query += key + '=' + encodeURI(eachObj);
            query += '&';
          }
        }
      } else {
        query += key + '=' + encodeURI(queryObject[key]);
        query += '&';
      }
    });
    if (query !== '') {
      query = query.slice(0, -1);
      query = '?' + query;
    }
    return query;
  }

  protected convertEmptyValueToNull(queryObject: any) {
    // tslint:disable-next-line:curly
    if (queryObject === null || queryObject === '') return null;
    if (
      typeof queryObject === 'number' ||
      typeof queryObject === 'boolean' ||
      typeof queryObject === 'string'
    ) {
      return queryObject;
    }
    const keyArray = Object.keys(queryObject);
    keyArray.forEach((key, i) => {
      if (typeof queryObject[key] === 'object' && queryObject[key] !== null) {
        if (Array.isArray(queryObject[key])) {
        } else {
          queryObject[key] = this.convertEmptyValueToNull(queryObject[key]);
        }
        return;
      }
      if (queryObject[key] === '') {
        queryObject[key] = null;
      }
    });
    return queryObject;
  }

  apiConnector(
    method: string,
    queryUri: string,
    body: any,
    file = false
  ): Observable<any> {
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json;charset=UTF-8',
      Authorization: `Bearer ${environment.API_TOKEN}`,
    });
    const httpOptions: any = {
      headers: httpHeaders,
    };

    body &&
      Object.entries(body).forEach(([key, value]) => {
        if (!!value && toString.call(value) === '[object Date]') {
          body[key] = (value as Date).toISOString();
        }
      });

    switch (method) {
      case 'GET':
        // if (body) queryUri += this.getQueryFilter(body);
        if (body)
          queryUri = `${queryUri}?${qs.stringify(body, {
            encodeValuesOnly: true,
          })}`;
        return this.http
          .get(queryUri, httpOptions)
          .pipe(catchError(this.handleError));

      case 'POST':
        body = this.convertEmptyValueToNull(body);
        return this.http
          .post(queryUri, body, httpOptions)
          .pipe(catchError(this.handleError));

      case 'PUT':
        body = this.convertEmptyValueToNull(body);
        return this.http
          .put(queryUri, body, httpOptions)
          .pipe(catchError(this.handleError));

      case 'PATCH':
        body = this.convertEmptyValueToNull(body);
        return this.http
          .patch(queryUri, body, httpOptions)
          .pipe(catchError(this.handleError));

      case 'DELETE':
        queryUri = `${queryUri}?${qs.stringify(body, {
          encodeValuesOnly: true,
        })}`;
        return this.http
          .delete(queryUri, httpOptions)
          .pipe(catchError(this.handleError));

      default:
        body = this.convertEmptyValueToNull(body);
        return this.http
          .post(queryUri, body, httpOptions)
          .pipe(catchError(this.handleError));
    }
  }

  apiConnector_upload(
    method: string,
    queryUri: string,
    body: FormData,
    file = false
  ): Observable<any> {
    const httpHeaders = new HttpHeaders({
      Authorization: `Bearer ${environment.API_TOKEN}`,
    });
    const httpOptions: any = {
      headers: httpHeaders,
    };

    switch (method) {
      case 'POST':
        return this.http
          .post(queryUri, body, httpOptions)
          .pipe(catchError(this.handleError));

      default:
        return this.http
          .post(queryUri, body, httpOptions)
          .pipe(catchError(this.handleError));
    }
  }

  private handleError(error: HttpErrorResponse | any) {
    console.log(error);
    return throwError(error);
  }
}
