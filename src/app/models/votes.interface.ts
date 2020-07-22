import { Time } from '@angular/common';

export interface Votes {
  id:  number,
  user_id:          number,
  created_at:       Time,
  updated_at:       Time
}