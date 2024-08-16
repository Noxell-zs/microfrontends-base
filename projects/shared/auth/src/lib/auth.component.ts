import {ChangeDetectionStrategy, Component} from '@angular/core';
import {AuthService} from "./auth.service";
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'lib-auth',
  standalone: true,
  imports: [
    AsyncPipe
  ],
  templateUrl: 'auth.component.html',
  styleUrls: ['./auth.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthComponent {
  count$ = this.authService.count$;

  constructor(
    private authService: AuthService,
  ) {}

  increment(): void {
    this.authService.increment();
  }

  decrement(): void {
    this.authService.decrement();
  }

}
