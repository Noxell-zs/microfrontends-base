import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {ActivatedRoute, RouterLink, RouterOutlet} from '@angular/router';
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
  image?: string;

  constructor(
    private instancesService: InstancesService,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
  ) {
    instancesService.getFederationManifest()
      .subscribe((manifest) => {
        this.instances = Object.keys(manifest);
        cdr.markForCheck();
      });

    instancesService.getPath(
      '/assets/aaa.svg',
      route.snapshot.data['name'],
    )
      .subscribe((image) => {
        this.image = image;
        cdr.markForCheck();
      });
  }
}
