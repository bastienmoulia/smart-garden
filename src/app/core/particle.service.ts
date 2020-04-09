import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class ParticleService {
  constructor(private http: HttpClient) {}

  getLevels() {
    return this.http
      .get(
        `${environment.particleApi}/devices/0123456789abcdef01234567/water-levels?access_token=1234`
      )
      .pipe(
        map(
          (data) =>
            (data as any).result as { topLevel: number; bottomLevel: number }
        )
      );
  }
}
