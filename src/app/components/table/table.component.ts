import { Component, OnInit } from '@angular/core';
import { Device, DeviceType } from 'src/app/models/devices';
import { DeviceManagmentService } from 'src/app/services/device-managment.service';
import { TableService } from 'src/app/services/table.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  _table: Array<Device> = [];
  _tableSortedASC: Array<Device> = [];
  _tableSortedDESC: Array<Device> = [];
  _sortOrder: number = 0;
  _tableBySortOrder: Array<Array<Device>> = [];
  _filterString: string = '';

  public rowClickHandler(device: Device) {
    this.deviceManagment.device = device;
  }

  public addDeviceClickHandler() {
    this.deviceManagment.device = new Device(
      -1,
      '',
      DeviceType.Unset,
      [{ width: 0, height: 0 }],
      0
    );
  }

  public idClickHandler() {
    this._sortOrder++;
    if (this._sortOrder > 2) {
      this._sortOrder = 0;
    }
  }

  _filterInputHandler(event: any) {
    if (event.target) {
      this._filterString = event.target.value;
    }
    this._tableBySortOrder = [
      this._table.filter((el) =>
        el.name.toLowerCase().includes(this._filterString.toLowerCase())
      ),
      this._tableSortedASC.filter((el) =>
        el.name.toLowerCase().includes(this._filterString.toLowerCase())
      ),
      this._tableSortedDESC.filter((el) =>
        el.name.toLowerCase().includes(this._filterString.toLowerCase())
      ),
    ];
  }

  ngOnInit(): void {
    this._tableBySortOrder = [
      this._table,
      this._tableSortedASC,
      this._tableSortedDESC,
    ];
  }
  constructor(
    public table: TableService,
    public deviceManagment: DeviceManagmentService
  ) {
    this._table = table.tableItems;
    this._tableSortedASC = [...this._table].sort((a, b) => {
      if (a.id < b.id) {
        return -1;
      }
      if (a.id > b.id) {
        return 1;
      }
      return 0;
    });
    this._tableSortedDESC = [...this._tableSortedASC].reverse();
  }
}
