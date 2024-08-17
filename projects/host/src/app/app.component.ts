import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {ActivatedRoute, RouterLink, RouterOutlet} from '@angular/router';
import {InstancesService} from "./services/instances.service";
import {NgForOf} from "@angular/common";
import {AuthComponent} from "auth";
import {AnyFederationManifest} from "./models/federation-manifest";

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
      .subscribe((manifest: AnyFederationManifest) => {
        this.instances = Object.keys(manifest);
        this.image = '/assets/aaa.svg';

        const name = route.snapshot.data['name'];
        console.log(2, name, manifest)
        if (name && (name in manifest)) {
          this.image = `${manifest[name].replace('/remoteEntry.json', '')}${this.image}`;
        }

        cdr.markForCheck();
      });
  }
}
