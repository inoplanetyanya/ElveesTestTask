import { Injectable } from '@angular/core';
import { Device, IDevice } from '../models/devices';
import { APIService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class TableService {
  private _tableItems: Array<Device> = [];

  constructor(private api: APIService) {
    let stream = api.getDevicesStream();
    stream.subscribe((value) =>
      (value as Array<IDevice>).map((device) => {
        this._tableItems.push(
          new Device(
            device.id,
            device.name,
            device.type,
            device.resolutions,
            device.selectedResolutionIndex
          )
        );
      })
    );
  }

  public addTableItem(newDevice: Device) {
    const sortedIds: Array<number> = this._tableItems
      .map((el) => el.id)
      .sort();
    let newId = sortedIds[sortedIds.length - 1] + 1;
    let prev = 0;
    for (let i = 0; i < sortedIds.length; i++) {
      const cur = sortedIds[i];
      if (cur - prev > 1) {
        newId = prev + 1;
        break;
      } else {
        prev = cur;
      }
    }
    if (isNaN(newId)) newId = 0;
    newDevice.id = newId;
    this._tableItems.push(newDevice);
    this.api.addDevice(JSON.parse(JSON.stringify(newDevice).replace(/_/g, '')));
  }

  public get tableItems(): Array<Device> {
    return this._tableItems;
  }
}
