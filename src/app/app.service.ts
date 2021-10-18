import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Results } from './model/funcionario';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  // URL to the details service
  private detailsUrl = 'https://datos.hacienda.gov.py/odmh-api-v2/rest/api/v2/nomina/detalle/';

  // URL to autocomplete service
  private autoCompleteUrl = 'https://datos.hacienda.gov.py/odmh-core/rest/nomina/autocompletePersonas';

  constructor(private http: HttpClient) {
  }

  /**
   * Gets details
   * 
   * @param ci Identification number
   */
  getDetails(ci: number): Observable<Results> {
    console.log('Get details called');

    // TODO: Remove after page and year filter functionality
    const defaultParams = '?page=1&by_anho=2021';

    return this.http.get<Results>(this.detailsUrl + ci + defaultParams);

  }

  /**
   * Search by a pattern
   * 
   * @param pattern pattern to search
   * @param page Page Number
   */
  autoComplete(pattern: string, page: number): Observable<Results> {
      console.log('Auto-complete called');

      // TODO: Remove after pagination functionality
      const defaultParams = '&page=' + page;
      const busqueda = '?q=' + pattern;
      const field = '&field=cedula';

      const ci = Number.parseInt(pattern, 10);

      if (isNaN(ci) ) {
        return this.http.get<Results>(this.autoCompleteUrl + busqueda + defaultParams);
      } else {
        return this.http.get<Results>(this.autoCompleteUrl + busqueda + defaultParams + field);
      }
  }

}
