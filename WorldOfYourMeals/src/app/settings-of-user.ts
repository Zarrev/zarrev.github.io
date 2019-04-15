export class Settings {
  public gps: boolean;
  public notifyCheck: boolean;
  public notifyNumber: number;

  constructor(gps: boolean, noti: boolean, notiFreq: number) {
    this.gps = gps;
    this.notifyCheck = noti;
    this.notifyNumber = notiFreq;
  }

  set madeFromMap(value: Map<any, any>) {
    this.gps = value['gps'];
    this.notifyCheck = value['notifyCheck'];
    this.notifyNumber = value['notifyNumber'];
  }
}
