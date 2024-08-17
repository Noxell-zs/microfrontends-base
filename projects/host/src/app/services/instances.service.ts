import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {map, Observable, shareReplay, zip} from "rxjs";
import {AnyFederationManifest, FederationManifest} from "../models/federation-manifest";
import {FEDERATION_MANIFEST} from "../consts/urls";
import {ActivatedRoute, Data} from "@angular/router";

@Injectable()
export class InstancesService {
  private manifest$: Observable<FederationManifest> | null = null;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
  ) {}

  getFederationManifest(): Observable<FederationManifest> {
    return this.manifest$ ??= this.http.get<FederationManifest>(FEDERATION_MANIFEST).pipe(
      shareReplay({
        refCount: false,
        bufferSize: 1,
      })
    );
  }

  getPath(fragment: string): Observable<string> {
    return zip(
      this.getFederationManifest(),
      this.route.data,
    ).pipe(map((
      [manifest, routeData]: [AnyFederationManifest, Data]
    ) => {
      const name = routeData['name'];

      if (name && (name in manifest)) {
        return `${manifest[name].replace('remoteEntry.json', '')}${fragment}`;
      }
      return `/${fragment}`;
    }));
  }
}
