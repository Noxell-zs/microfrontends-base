import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  count$ = new BehaviorSubject<number>(0);

  increment(): void {
    this.count$.next(this.count$.value + 1);
  }

  decrement(): void {
    this.count$.next(this.count$.value - 1);
  }
}
