import { Component } from '@angular/core';
import { IDevice } from './models/devices';
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
    console.log('Изменения сохранены');
    const editingDevice = this.deviceManagment.device
    if (editingDevice) {
      editingDevice.name = newDeviceStats.name;
      editingDevice.type = newDeviceStats.type;
      editingDevice.resolutions = [...newDeviceStats.resolutions];
      editingDevice.selectedResolutionIndex = newDeviceStats.selectedResolutionIndex;
      if (editingDevice.id.length == 0) {
        this.table.addTableItem(editingDevice)
      }
    }
    console.log(editingDevice)
    this.deviceManagment.device = null;
    console.log(editingDevice)
    console.log(this.table.tableItems)
  };

  public cancelClickHandler = (event: MouseEvent) => {
    console.log('Изменения отменены');
    this.deviceManagment.device = null;
  };

  constructor(public table: TableService, public deviceManagment: DeviceManagmentService) {}
}
