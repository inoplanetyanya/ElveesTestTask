import { Injectable } from '@angular/core';
import { Device, DeviceType } from '../models/devices';

@Injectable({
  providedIn: 'root',
})
export class TableService {
  private _tableItems: Array<Device> = [];

  constructor() {
    this._tableItems = [
      new Device('1', 'Наружная', DeviceType.StationaryCamera, [
        { width: 100, height: 200 },
        { width: 400, height: 600 },
      ]),
      new Device('4', 'Столовая', DeviceType.RotaryCamera, [
        { width: 100, height: 200 },
        { width: 400, height: 600 },
      ]),
      new Device('2', 'Холл', DeviceType.RotaryCamera, [
        { width: 100, height: 200 },
        { width: 400, height: 600 },
      ]),
    ];
    this._tableItems[1].selectedResolutionIndex = 1;
  }

  public addTableItem(newDevice: Device) {
    const sortedIds: Array<number> = this._tableItems.map(el => Number(el.id)).sort();
    let newId = sortedIds[sortedIds.length - 1] + 1;
    let prev = 0;
    for (let i = 0; i < sortedIds.length; i++) {
      const cur = sortedIds[i];
      if (cur - prev > 1) {
        newId = prev + 1;
        break;
      }
      else {
        prev = cur;
      }
    }
    if (isNaN(newId)) newId = 0;
    newDevice.id = newId.toString();
    this._tableItems.push(newDevice);
    console.log(this._tableItems, newDevice)
  }

  public get tableItems(): Array<Device> {
    return this._tableItems;
  }
}
