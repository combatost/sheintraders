import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-sheintable',
  templateUrl: './sheintable.component.html',
  styleUrls: ['./sheintable.component.sass']
})
export class SheintableComponent implements OnInit {
  userForm!: FormGroup;
  onselect: any = [];
  switch = false;
  showClearConfirmationDialog = false;
  indexoftable!: number;

  constructor(
    private dataform: FormBuilder,
    private firebaseService: FirebaseService
  ) {
    this.userForm = this.dataform.group({
      client: ['', Validators.required],
      num1: [0, Validators.required],
      num2: [0, Validators.required],
      num4: [0, Validators.required],
      num7: [0, Validators.required],
      num8: [0, Validators.required],
      choice: ['', Validators.required],
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
      this.onselect.push(this.userForm.value);
      this.userForm.reset();
      await this.firebaseService.saveUserData(this.onselect);
    }
  }

  onClear() {
    this.userForm.reset();
  }

  onEdit(index: number) {
    this.userForm.patchValue(this.onselect[index]);
    this.switch = true;
    this.indexoftable = index;
  }

  async onupdate() {
    this.onselect[this.indexoftable] = this.userForm.value;
    this.userForm.reset();
    this.switch = false;
    await this.firebaseService.saveUserData(this.onselect);
  }

  calculateOverallTotal(): number {
    return this.onselect.reduce((total: number, item: any) =>
      total + item.num1 + item.num2 + item.num4 + item.num8, 0);
  }

  calculateOverallProfit(): number {
    return this.onselect.reduce((totalProfit: number, item: any) =>
      totalProfit + item.num2 + item.num4 + item.num8 - item.num7, 0);
  }

  onClean(): void {
    this.showClearConfirmationDialog = true;
  }

  async confirmClear(index: number) {
    this.onselect.splice(index, 1);
    this.showClearConfirmationDialog = false;
    await this.firebaseService.saveUserData(this.onselect);
  }

  cancelClear(): void {
    this.showClearConfirmationDialog = false;
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
