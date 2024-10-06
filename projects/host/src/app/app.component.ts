import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {InstancesService} from "./services/instances.service";
import {NgForOf} from "@angular/common";
import {AuthComponent} from "auth";
import { loadRemoteModule } from '@angular-architects/native-federation';
import { switchMap, tap } from 'rxjs';

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
  @ViewChild('news', { read: ViewContainerRef }) viewContainer!: ViewContainerRef;

  title = 'host';
  instances?: string[];
  image?: string;

  constructor(
    private instancesService: InstancesService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.instancesService.getFederationManifest().pipe(
      tap((manifest) => this.instances = Object.keys(manifest)),
      switchMap(
        (manifest) => loadRemoteModule({
          remoteEntry: manifest.instance,
          exposedModule: './News'
        })
      )
    ).subscribe((module) => {
      const ref = this.viewContainer.createComponent(module.NewsComponent);
      this.cdr.markForCheck();
    });

    this.instancesService.getPath('assets/aaa.svg')
      .subscribe((image) => {
        this.image = image;
        this.cdr.markForCheck();
      });
  }
}
