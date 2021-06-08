import { Component, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { DataService } from '../../services/data.service';


@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent {
  transactions: any | null = null;
  searchText = '';

  value = '';

  sortedData: any;

  constructor(private dataService: DataService) {
  }

  clearSearchField() {
    this.searchText = '';
  }

  ngOnInit(){
    this.dataService.refresh$
      .subscribe(() =>{
        this.getTransactions();
      })
      this.getTransactions();
  }

  private getTransactions(){
    this.dataService.GetTransactions().subscribe((data: any)=>{
      this.transactions = data.sort(function(a: any, b: any) {
        const isAsc = true;
        var newdate = new Date(b.dates.valueDate).getTime();
        var newdate1 = new Date(a.dates.valueDate).getTime();
        return compare(newdate, newdate1, isAsc)
      });
    }) 
  }

  sortData(sort: Sort) {
    const data = this.transactions.slice();
    if (!sort.active || sort.direction === '') {
      this.transactions = data;
      return;
    }

    this.transactions = data.sort((a: any, b: any) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'date':
          return compare(new Date(a.dates.valueDate).getTime(), new Date(b.dates.valueDate).getTime(), isAsc);
        case 'name':
          return compare(a.merchant.name, b.merchant.name, isAsc);
        case 'amount':
          return compare(
            parseInt(a.transaction.amountCurrency.amount),
            parseInt(b.transaction.amountCurrency.amount),
            isAsc
          );
        default:
          return 0;
      }
    });
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

