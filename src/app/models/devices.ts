export interface IResolution {
  width: number;
  height: number;
}

export enum DeviceType {
  Unset = 'Не установлен',
  StationaryCamera = 'Стационарная камера',
  RotaryCamera = 'Поворотная камера',
}

export interface IDevice {
  id: string;
  name: string;
  type: DeviceType;
  resolutions: Array<IResolution>;
  selectedResolutionIndex: number;
}

export class Device implements IDevice {
  private _id: string;
  private _name: string;
  private _type: DeviceType;
  private _resolutions: Array<IResolution>;
  private _selectedResolutionIndex: number;

  constructor(
    id: string,
    name: string,
    type: DeviceType,
    resolutions: Array<IResolution>,
    selectedResolutionIndex: number = 0
  ) {
    this._id = id;
    this._name = name;
    this._type = type;
    this._resolutions = resolutions;
    this._selectedResolutionIndex = selectedResolutionIndex;
  }

  public addResolution(toAdd: IResolution) {
    this._resolutions.push({ ...toAdd });
  }

  public removeResolution(toRemove: IResolution) {
    const resolutions = this._resolutions;
    const removeIndex: number = resolutions.findIndex(
      (resolution) =>
        resolution.width == toRemove.width &&
        resolution.height == toRemove.height
    );
    if (removeIndex > -1) {
      resolutions.splice(removeIndex, 1);
      if (this._selectedResolutionIndex > this._resolutions.length - 1) {
        this._selectedResolutionIndex--;
      }
    }
  }

  public get id(): string {
    return this._id;
  }

  public set id(value: string) {
    this._id = value;
  }

  public get name(): string {
    return this._name;
  }

  public set name(value: string) {
    this._name = value;
  }

  public get type(): DeviceType {
    return this._type;
  }

  public set type(value: DeviceType) {
    this._type = value;
  }

  public get resolutions(): IResolution[] {
    return this._resolutions.map((res) => ({ ...res }));
  }

  public set resolutions(value: IResolution[]) {
    this._resolutions = [...value];
  }

  public get selectedResolutionIndex(): number {
    return this._selectedResolutionIndex;
  }

  public set selectedResolutionIndex(value) {
    this._selectedResolutionIndex = value;
  }
}
