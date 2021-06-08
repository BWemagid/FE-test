import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DataService } from '../../../../services/data.service';


@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {
  accountInfo : any;
  info: any;
  updateInfo: any;
  createItem: any;

  constructor(private svc: DataService, private dialogRef: MatDialogRef<PreviewComponent>,@Inject(MAT_DIALOG_DATA) public indata: any) { }

  ngOnInit(): void {
    this.info = this.indata;
    this.svc.GetAccountRecords().subscribe((data: any)=>{
      this.accountInfo = data;
    }) 
    
    this.createItem = {
      "categoryCode": "#000",
      "image": "/assets/icons/online-transfer.png",
      "dates":{
        "valueDate": new Date().toISOString().slice(0, 10)
      },
      "merchant":{
        "name": this.indata.savingaccount
      },
      "transaction":{
        "type": this.indata.type,
        "amountCurrency":{
          "amount": "+" +this.indata.amount,
          "currencyCode": "EUR"
        }
      }
    }
  }

  updateTotal(){
    this.updateInfo = {
      "checkings": {
        "name": this.indata.mainaccount,
        "amount": parseInt(this.indata.mainamount) - parseInt(this.indata.amount)
      },
      "savings":{
        "name": this.indata.savingaccount,
        "amount": parseInt(this.indata.savingamount) + parseInt(this.indata.amount)
      }
    }
  }



  

  onSubmit() {
    this.updateTotal();
    this.svc.updateAccountRecords('account', this.updateInfo)
      .subscribe(response => {
        console.log(response);
      },
      error => {
        console.log(error);
      })  
    this.svc.create(this.createItem)
      .subscribe(response => {
        console.log(response);
      },
      error => {
        console.log(error);
      }) 
  }

}
