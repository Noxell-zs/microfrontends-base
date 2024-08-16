import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {InstancesService} from "./services/instances.service";
import {NgForOf} from "@angular/common";
import {AuthComponent} from "auth";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgForOf, RouterLink, AuthComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'host';
  instances?: string[];

  constructor(
    private instancesService: InstancesService,
    private cdr: ChangeDetectorRef,
  ) {
    instancesService.getFederationManifest()
      .subscribe(manifest => {
        this.instances = Object.keys(manifest);
        cdr.markForCheck();
      });
  }
}
