import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { of } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';

const DEFAULT_TIMEOUT = 15000;

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  cedula: number;

  initPage = 1;
  pattern = '';
  prevPattern = '';
  minPatternLength = false;
  searchPattern = false;

  searched = false;
  foundMatch = false;
  errorDetails = false;
  responseDetails;

  errorFuncionario = false;
  responseFuncionario;
  serverError = false;

  // map to store incomes
  salary = new Map();

  // map to store months
  months = [];

  constructor(private appService: AppService,
              private spinner: NgxSpinnerService) {

    // Static stuff
    this.initMonthsMap();

  }

  /**
   * Extracts Values from Map
   *
   * @param map Map to extract values
   */
  getKeys(map) {
    return Array.from(map.values());
  }

  /**
   * Static initialization of months
   */
  private initMonthsMap() {
    this.months.push('Enero');
    this.months.push('Febrero');
    this.months.push('Marzo');
    this.months.push('Abril');
    this.months.push('Mayo');
    this.months.push('Junio');
    this.months.push('Julio');
    this.months.push('Agosto');
    this.months.push('Septiembre');
    this.months.push('Octubre');
    this.months.push('Noviembre');
    this.months.push('Diciembre');
  }

  ngOnInit() {

  }

  ngOnSelectedFuncionario(funcionario: string) {
    this.cedula = Number.parseInt((funcionario.match(/\d+/g)).toString());
    this.ngOnSearch();
  }

  /**
   * Make a call to the API using the CI as parameter
   */
  ngOnSearch() {
    this.serverError = false;
    this.spinner.show();
    this.salary = new Map();

    if (this.cedula && this.cedula > 0) {
      this.searched = true;
      this.appService.getDetails(this.cedula)
        .pipe(
          timeout(DEFAULT_TIMEOUT),
          catchError(() => {
            this.errorDetails = true;
            console.error('Request timed out after ', DEFAULT_TIMEOUT);
            return of();
          }),
        )
        .subscribe(
        details => {
          this.responseDetails = details;
          this.foundMatch = this.responseDetails && this.responseDetails.results.length > 0;
          this.extractedSalaryPerMonth();
        },
        () => {
          this.foundMatch = false;
          this.errorDetails = true;
          this.spinner.hide();
        },
        () => {
          this.spinner.hide();
        }
      );
    } else {
      this.foundMatch = false;
      this.spinner.hide();
    }
  }

  private extractedSalaryPerMonth() {
    let sum = 0;
    this.responseDetails.results.forEach(activity => {
      const month = activity.mes;
      const salary = activity.montoPresupuestado;

      if (this.salary.has(month)) {
        sum = this.salary.get(month) + salary;
        this.salary.set(month, sum);
      } else {
        this.salary.set(month, salary);
      }
    });
  }

  /**
   * Make a call to the API for the next page
   * @param selectedPage Selected Page
   */
  changePage(selectedPage: number) {
    this.spinner.show();
    if (selectedPage) {
      this.initPage = selectedPage;
    } else {
      this.initPage = 1;
    }

    // test spinner
    // this.responseFuncionario = {'total' : 5,
    //   'autocomplete' : [ 'LOURDES CAÑETE MOLINAS (6089520)', 'LOURDES GONZALEZ RUIZ (5064941)' ],
    //   'totalPages' : 4};
    // this.spinner.hide();

    this.appService.autoComplete(this.pattern, this.initPage).subscribe(
      lista => {
        this.responseFuncionario = lista;
      },
      () => {
        this.errorFuncionario = true;
      }, () => {
        this.spinner.hide();
      }
    );
  }

  /**
   * Autocomplete function
   *
   * Make a call iff the pattern's length is equal or greater than 3.
   * Because the API does not support searches with fewer characters.
   */
  ngOnAutocomplete(event, selectedPage: number) {
    if (event.key === 'Enter') {
      this.searchPattern = true;
      if (this.pattern.length >= 3) {
        this.minPatternLength = true;
        this.spinner.show();
        if (this.prevPattern !== this.pattern) {
          selectedPage = 1;
          this.prevPattern = this.pattern;
        }

        if (selectedPage) {
          this.initPage = selectedPage;
        } else {
          this.initPage = 1;
        }

        this.appService.autoComplete(this.pattern, this.initPage)
          .pipe(
                timeout(DEFAULT_TIMEOUT),
                catchError(() => {
                  this.errorFuncionario = true;
                  console.error('Request timed out after: ', DEFAULT_TIMEOUT);
                  return of();
                }),
            )
          .subscribe(
          lista => {
            this.responseFuncionario = lista;
          },
          () => {
            this.errorFuncionario = true;
            this.spinner.hide();
          }, () => {
            this.spinner.hide();
          }
        );
      } else {
        this.minPatternLength = false;
        this.responseFuncionario = {};
      }
    }
  }

}
