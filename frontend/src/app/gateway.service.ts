import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GatewayService {
  readonly gateway: string = 'http://52.14.82.238:80';
  // readonly gateway: string = 'http://localhost:8080';
}
