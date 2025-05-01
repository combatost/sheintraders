import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from '../services/firebase.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-sheintable',
  templateUrl: './sheintable.component.html',
  styleUrls: ['./sheintable.component.sass']
})
export class SheintableComponent implements OnInit {
  userForm!: FormGroup;
  onselect: any = [];
  switch = false;
  indexoftable!: number;
  showCancelButton: boolean = false;

  constructor(
    private dataform: FormBuilder,
    private firebaseService: FirebaseService,
    private dialog: MatDialog
  ) {
    this.userForm = this.dataform.group({
      client: ['', Validators.required],
      cost: [0, Validators.required],
      delivery: [0, Validators.required],
      discount: [0, Validators.required],
      shippingCost: [0, Validators.required],
      quantity: [0, Validators.required],
      choice: ['', Validators.required],
      includeQuantityInProfit: [false],
    });
  }

  ngOnInit() {
    this.firebaseService.getUserData()?.subscribe((doc: any) => {
      if (doc?.data) {
        this.onselect = doc.data;
      }
    });
  }

  async onClick() {
    if (this.userForm.valid) {
      const formValue = this.userForm.value;

      if (this.switch) {
        this.onselect[this.indexoftable] = formValue;
        this.switch = false;
      } else {
        this.onselect.push(formValue);
      }

      this.userForm.reset();
      await this.firebaseService.saveUserData(this.onselect);
    }
  }

  onQuantityProfitChange() {
    const quantityProfitChecked = this.userForm.get('includeQuantityInProfit')?.value;

    if (quantityProfitChecked) {
      const quantity = this.userForm.get('quantity')?.value || 0;
      const profit = quantity;
      this.userForm.patchValue({ quantity: profit });
    } else {
      this.userForm.patchValue({ quantity: 0 });
    }
  }

  onClear() {
    this.userForm.reset();
  }

  onEdit(index: number) {
    this.userForm.patchValue(this.onselect[index]);
    this.switch = true;
    this.indexoftable = index;
    this.showCancelButton = true;
  }

  async onupdate() {
    this.onselect[this.indexoftable] = this.userForm.value;
    this.userForm.reset();
    this.switch = false;
    await this.firebaseService.saveUserData(this.onselect);
  }

  calculateProfit(item: any): number {
    const discountAmount = (item.cost * item.discount) / 100;
    let profit = discountAmount + item.delivery - item.shippingCost;

    if (item.includeQuantityInProfit) {
      profit += item.quantity;
    }

    return profit;
  }

  calculateOverallTotal(): number {
    return this.onselect.reduce((total: number, item: any) =>
      total + item.cost + item.discount + item.delivery + item.quantity, 0);
  }

  calculateOverallProfit(): number {
    return this.onselect.reduce((totalProfit: number, item: any) =>
      totalProfit + this.calculateProfit(item), 0);
  }

  async confirmClear(index: number) {
    this.onselect.splice(index, 1);
    await this.firebaseService.saveUserData(this.onselect);
  }

  onClean(index: number): void {
    this.indexoftable = index;
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'Delete Confirmation',
        message: 'Are you sure you want to delete this entry?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.confirmClear(index);
      }
    });
  }

  onCancel() {
    this.userForm.reset();
    this.switch = false;
    this.showCancelButton = false;
  }

  async onSave() {
    try {
      await this.firebaseService.saveUserData(this.onselect);
      alert('Data saved successfully!');
    } catch (error) {
      console.error('Save failed', error);
      alert('Error saving data.');
    }
  }
}
