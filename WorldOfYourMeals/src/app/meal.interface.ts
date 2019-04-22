import {Marker} from './marker.interface';

export interface Meal {
  $key: string;
  src: string;
  name: string;
  rate: number;
  date: Date;
  where: Marker;
  fitBounds?: boolean;
}
