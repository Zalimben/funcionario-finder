import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit, OnChanges {
  @Input() totalPages: number;
  @Output() changeActivePage = new EventEmitter<number>();

  minDisplayedPages = 7;
  activePage = 1;

  showDotsBeforeActive: boolean;
  showDotsAfterActive: boolean;
  showLastPage: boolean;
  pages;

  constructor() {}

  /**
   * Initial State of Pagination component
   */
  ngOnInit() {
    console.log('Pagination init...');
    this.showDotsBeforeActive = false;
    this.showDotsAfterActive = false;
    this.showLastPage = true;
    this.pages = this.paginationPages();
  }

  /**
   * Changes event
   * @param changes page event
   */
  ngOnChanges(changes: SimpleChanges) {
    this.totalPages = changes.totalPages.currentValue;
    this.pages = this.paginationPages();
  }

  /**
   * Constructor for Pagination pages
   */
  paginationPages(): number[] {
    const displayNumber = Math.floor(this.minDisplayedPages / 2);
    const array = [];

    let startPage = this.activePage - displayNumber;
    let endPage = this.activePage + displayNumber;

    if (startPage <= 1) {
      startPage = 1;
      this.showDotsAfterActive = false;
    } else {
      this.showDotsBeforeActive = true;
    }

    if (endPage >= this.totalPages) {
      endPage = this.totalPages;
      this.showDotsAfterActive = false;
    } else {
      this.showDotsAfterActive = true;
    }

    this.showLastPage = this.totalPages >= endPage;

    for (let x = startPage; x <= endPage; x++) {
      array.push(x);
    }

    return array;
  }

  /**
   * Change page event
   * @param page New Page
   */
  onChangePage(page: number) {
    console.log('Page changing ...');
    this.activePage = page;
    this.changeActivePage.emit(page);
    this.pages = this.paginationPages();
  }

  /**
   * Change to the previous page event
   */
  onPrevPage() {
    console.log('Previous page ...');
    this.activePage = this.activePage - 1;
    this.changeActivePage.emit(this.activePage);
    this.pages = this.paginationPages();
  }

  /**
   * Change to the next page event
   */
  onNextPage() {
    console.log('Next page ...');
    this.activePage = this.activePage + 1;
    this.changeActivePage.emit(this.activePage);
    this.pages = this.paginationPages();
  }
}
