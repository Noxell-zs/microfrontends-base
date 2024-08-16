import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {FederationManifest} from "../models/federation-manifest";
import {FEDERATION_MANIFEST} from "../consts/urls";

@Injectable({providedIn: "root"})
export class InstancesService {
  constructor(
    private http: HttpClient,
  ) {}

  getFederationManifest(): Observable<FederationManifest> {
    return this.http.get<FederationManifest>(FEDERATION_MANIFEST);
  }
}
