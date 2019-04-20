import {Marker} from '../history/marker.interface';

export interface Meal {
  id: number;
  src: string;
  name: string;
  rate: number;
  date: Date;
  where: Marker;
  fitBounds?: boolean;
}
