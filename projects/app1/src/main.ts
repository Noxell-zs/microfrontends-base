import { initFederation } from '@angular-architects/native-federation';
import {FEDERATION_MANIFEST} from "./app/consts/urls";

initFederation(FEDERATION_MANIFEST)
  .catch(console.error)
  .then(_ => import('./bootstrap'))
  .catch(console.error);
