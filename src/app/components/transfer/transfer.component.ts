import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { DataService } from '../../services/data.service';
import {MatDialog} from '@angular/material/dialog';
import { PreviewComponent } from './modal/preview/preview.component';


@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss']
})
export class TransferComponent implements OnInit {

  accountinfo: any;
  submitted = false;

  transferForm = this.fb.group({
    type: ['Online Transfer'],
    amount: ['', Validators.required],
    mainaccount:['Free Checkings'],
    mainamount:[''],
    savingaccount:['Georgia Power Savings'],
    savingamount:[''],
  });

  constructor(public data: DataService,public dialog: MatDialog, private fb: FormBuilder) { }

  ngOnInit(){
    this.data.refresh$
      .subscribe(() =>{
        this.getUpdate();
      })

    this.getUpdate();
  }

  private getUpdate(){
    this.data.GetAccountRecords().subscribe((data: any)=>{
      this.accountinfo = data;
      this.transferForm.controls['mainamount'].setValue(data.checkings.amount)
      this.transferForm.controls['savingamount'].setValue(data.savings.amount)
    }) 
  }

  get f() { return this.transferForm.controls; }

  openDialog() {
    if (parseInt(this.transferForm.value.mainamount) - parseInt(this.transferForm.value.amount) < +parseInt("-500")){
      alert("The amount you are trying to transfer will overdraw your account.")
    }else{
      
      if (!this.transferForm.valid){
        this.submitted = true;
      }else{
        const dialogRef = this.dialog.open(PreviewComponent, {
          data: this.transferForm.value
        });
    
        dialogRef.afterClosed().subscribe(result => {
          console.log(result);
        });
      }
      

    }

  }

}
