import {Marker} from '../history/marker.interface';

export interface Meal {
  id: number;
  src: string;
  name: string;
  rate: number;
  date?: Date; // TODO: cannot be null
  where?: Marker; // TODO: cannot be null
}
