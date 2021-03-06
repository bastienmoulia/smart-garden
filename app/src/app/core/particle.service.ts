import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, combineLatest } from 'rxjs/operators';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';

const DEVICE = 'e00fce68ecae511856da9204';
const TOKEN = '44ff2f1650f409c184a3f2d363c9be5578f18787';

@Injectable({
  providedIn: 'root',
})
export class ParticleService {
  constructor(private http: HttpClient) {}

  getLevels() {
    const topLevel$ = this.http
      .get(
        `${environment.particleApi}/devices/${DEVICE}/topLevel?access_token=${TOKEN}`
      )
      .pipe(map((data: any) => data.result as number));
    const bottomLevel$ = this.http
      .get(
        `${environment.particleApi}/devices/${DEVICE}/bottomLevel?access_token=${TOKEN}`
      )
      .pipe(map((data: any) => data.result as number));

    return forkJoin([topLevel$, bottomLevel$]).pipe(
      map(([topLevel, bottomLevel]) => {
        return { topLevel, bottomLevel };
      })
    );
  }

  refill() {
    return this.http.post(
      `${environment.particleApi}/devices/${DEVICE}/refill?access_token=${TOKEN}`,
      {}
    );
  }
}
