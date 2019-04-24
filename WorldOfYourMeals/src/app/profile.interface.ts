import {Settings} from './user.settings.interface';

export interface Profile {
  $key: string;
  nickname: string;
  userPhoto?: string;
  coverUrl?: string;
  settings: Settings;
}
