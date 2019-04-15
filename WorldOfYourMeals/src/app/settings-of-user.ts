export class Settings {
  public gps: boolean;
  public noti: boolean;
  public notiFreq: number;

  constructor(gps: boolean, noti: boolean, notiFreq: number) {
    this.gps = gps;
    this.noti = noti;
    this.notiFreq = notiFreq;
  }

  set madeFromMap(value: Map<any, any>) {
    this.gps = value['gps'];
    this.noti = value['noti'];
    this.notiFreq = value['notiFreq'];
  }
}
