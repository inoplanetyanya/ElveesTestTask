import { Component } from '@angular/core';
import { IDevice } from './models/devices';
import { APIService } from './services/api.service';
import { DeviceManagmentService } from './services/device-managment.service';
import { TableService } from './services/table.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'elvees-test-task';

  public saveClickHandler = (event: MouseEvent, newDeviceStats: IDevice) => {
    const editingDevice = this.deviceManagment.device;
    if (editingDevice) {
      editingDevice.name = newDeviceStats.name;
      editingDevice.type = newDeviceStats.type;
      editingDevice.resolutions = [...newDeviceStats.resolutions];
      editingDevice.selectedResolutionIndex =
        newDeviceStats.selectedResolutionIndex;
      if (editingDevice.id.length == 0) {
        this.table.addTableItem(editingDevice);
      } else {
        this.api.updateDevice(
          JSON.parse(JSON.stringify(editingDevice).replace(/_/g, ''))
        );
      }
    }
    this.deviceManagment.device = null;
  };

  public cancelClickHandler = (event: MouseEvent) => {
    this.deviceManagment.device = null;
  };

  constructor(
    public table: TableService,
    public deviceManagment: DeviceManagmentService,
    private api: APIService
  ) {}
}
