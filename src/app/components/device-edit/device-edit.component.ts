import {
  Component,
  ViewChildren,
  Input,
  OnInit,
  ElementRef,
} from '@angular/core';
import { Device, DeviceType, IDevice, IResolution } from '../../models/devices';

@Component({
  selector: 'app-device-edit',
  templateUrl: './device-edit.component.html',
  styleUrls: ['./device-edit.component.scss'],
})
export class DeviceEditComponent implements OnInit {
  @Input() device: Device = new Device('', '', DeviceType.Unset, []);
  @Input() saveClickHandler: {
    (event: MouseEvent, newDeviceStats: IDevice): any;
  } = () => {};
  @Input() cancelClickHandler: { (event: MouseEvent): any } = () => {};

  _id: string = '';
  _name: string = '';
  _type: DeviceType = DeviceType.Unset;
  _types = Object.values(DeviceType);
  _resolutions: Array<IResolution> = [];
  _selectedResolutionIndex: number = 0;
  _maxResolutions = 4;
  _allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight'];

  public allInputsFilled = () => {
    return false;
  };
  @ViewChildren('deviceEditInput') inputs!: Array<ElementRef<HTMLInputElement>>;
  @ViewChildren('resolutionInput') resolutionInputs!: Array<
    ElementRef<HTMLInputElement>
  >;
  ngAfterViewInit() {
    setTimeout(() => {
      this.allInputsFilled = () => {
        return [...this.inputs].every(
          (el) =>
            el.nativeElement.value.length > 0 &&
            [...this.resolutionInputs].every(
              (el) => Number(el.nativeElement.value) > 0
            ) &&
            this._type != DeviceType.Unset
        );
      };
    }, 0);

    console.log(this.allInputsFilled());
  }

  public nameInputHandler(event: any) {
    this._name = event.target.value;
  }

  public typeSelectChangeHandler(event: any) {
    this._type = event.target.value;
  }

  public resolutionInputHandler(event: any, index: number, property: string) {
    const value = event.target.value.replace(/\D/g, '');
    if (value.length > 0) {
      event.target.value = value;
      this._resolutions[index][property as keyof IResolution] = Number(value);
    }
  }

  public _selectResolutionClickHandler = (index: number) => {
    this._selectedResolutionIndex = index;
  };

  public addResolutionClickHandler = () => {
    const addResolutionHere = this.device.addResolution.bind(this);
    addResolutionHere({ width: 0, height: 0 });
  };

  public removeResolutionClickHandler = (index: number) => {
    const toRemove = this.device.resolutions[index];
    const removeResolutionHere = this.device.removeResolution.bind(this);
    removeResolutionHere(toRemove);
  };

  public _saveClickHandler = (event: MouseEvent) => {
    const _newDeviceStats: IDevice = {
      id: this._id,
      name: this._name,
      type: this._type,
      resolutions: this._resolutions,
      selectedResolutionIndex: this._selectedResolutionIndex,
    };
    this.saveClickHandler(event, _newDeviceStats);
  };

  constructor() {}

  ngOnInit(): void {
    this._id = this.device.id;
    this._name = this.device.name;
    this._type = this.device.type;
    this._resolutions = [...this.device.resolutions];
    this._selectedResolutionIndex = this.device.selectedResolutionIndex;
  }
}
