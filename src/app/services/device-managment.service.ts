import { Injectable } from '@angular/core';
import { Device } from '../models/devices';

@Injectable({
  providedIn: 'root',
})
export class DeviceManagmentService {
  private _editingDevice: Device | null = null;

  public set device(value: Device | null) {
    this._editingDevice = value;
  }

  public get device(): Device | null {
    return this._editingDevice;
  }

  constructor() {}
}
