import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {map, Observable, shareReplay} from "rxjs";
import {AnyFederationManifest, FederationManifest} from "../models/federation-manifest";
import {FEDERATION_MANIFEST} from "../consts/urls";

@Injectable({providedIn: "root"})
export class InstancesService {
  private manifest$: Observable<FederationManifest> | null = null;

  constructor(
    private http: HttpClient,
  ) {}

  getFederationManifest(): Observable<FederationManifest> {
    return this.manifest$ ??= this.http.get<FederationManifest>(FEDERATION_MANIFEST).pipe(
      shareReplay({
        refCount: false,
        bufferSize: 1,
      })
    );
  }

  getPath(fragment: string, instanceName?: string): Observable<string> {
    return this.getFederationManifest().pipe(map((
      manifest: AnyFederationManifest
    ) => {
      if (instanceName && (instanceName in manifest)) {
        return `${manifest[instanceName].replace('/remoteEntry.json', '')}${fragment}`;
      }
      return fragment;
    }));
  }
}
