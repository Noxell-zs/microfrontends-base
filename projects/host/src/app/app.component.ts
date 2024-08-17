import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {InstancesService} from "./services/instances.service";
import {NgForOf} from "@angular/common";
import {AuthComponent} from "auth";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgForOf, RouterLink, AuthComponent],
  providers: [InstancesService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  title = 'host';
  instances?: string[];
  image?: string;

  constructor(
    private instancesService: InstancesService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.instancesService.getFederationManifest()
      .subscribe((manifest) => {
        this.instances = Object.keys(manifest);
        this.cdr.markForCheck();
      });

    this.instancesService.getPath('assets/aaa.svg')
      .subscribe((image) => {
        this.image = image;
        this.cdr.markForCheck();
      });
  }
}
