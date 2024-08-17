import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable, shareReplay} from "rxjs";
import {FederationManifest} from "../models/federation-manifest";
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
}
