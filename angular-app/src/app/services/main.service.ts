import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ApiService } from '../drivers/api.service';

@Injectable({
  providedIn: 'root',
})
export class MainService extends ApiService {
  public getRoom(query: any): Observable<any> {
    const queryUrl = `${environment.API_URL}/rooms`;
    return this.apiConnector('GET', queryUrl, query);
  }

  public joinRoom(id: string, idToken: any): Observable<any> {
    const body = {
      id_token: idToken,
      client_id: environment.CHANNEL_ID,
    };
    const queryUrl = `${environment.API_URL}/rooms/${id}/join`;
    return this.apiConnector('POST', queryUrl, body);
  }
}
