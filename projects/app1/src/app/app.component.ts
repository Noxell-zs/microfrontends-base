import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {InstancesService} from "./services/instances.service";
import {NgForOf} from "@angular/common";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgForOf, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'app1';
  instances?: string[];

  constructor(
    private instancesService: InstancesService
  ) {
    instancesService.getFederationManifest().subscribe(manifest => {
      this.instances = Object.keys(manifest);
    })
  }
}
