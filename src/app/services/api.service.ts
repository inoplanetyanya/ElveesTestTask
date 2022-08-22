import { Injectable } from '@angular/core';
import { ajax } from 'rxjs/ajax';
import { IDevice } from '../models/devices';
@Injectable({
  providedIn: 'root',
})
export class APIService {
  url = 'http://localhost:3000/devices';

  getDevicesStream() {
    const stream$ = ajax.getJSON(this.url);
    return stream$;
  }

  addDevice(device: IDevice) {
    const stream$ = ajax.post(this.url, JSON.stringify(device), {
      'content-type': 'application/json',
    });
  }

  updateDevice(device: IDevice) {
    const stream$ = ajax.put(
      this.url + `/${device.id}`,
      JSON.stringify(device),
      {
        'content-type': 'application/json',
      }
    );
  }

  constructor() {}
}
