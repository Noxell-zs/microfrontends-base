import { Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/native-federation';
import {FederationManifest} from "./models/federation-manifest";
import {FEDERATION_MANIFEST} from "./consts/urls";

export const routes$: Promise<Routes> = fetch(FEDERATION_MANIFEST)
  .then((response) => response.json())
  .then((manifest: FederationManifest) => Object.keys(manifest).map(name => ({
    path: name,
    loadComponent: () =>
      loadRemoteModule(name, './Instance').then((m) => m.AppComponent),
  })));
