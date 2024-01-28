import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-sheintable',
  templateUrl: './sheintable.component.html',
  styleUrl: './sheintable.component.css'
})
export class SheintableComponent {
  userForm!: FormGroup;
  onselect: any = [];
  switch = false;
  showClearConfirmationDialog = false;
  indexoftable!: number;
  number1: number = null!;
  number2: number = null!;
  number4: number = null!;
  number7: number = null!;
  number8:number = null!;
  result: number = 0;



  constructor(private dataform: FormBuilder) {

    this.onselect = [{
      client: 'احمد', num8: 3, num1: 3, num2: 5, num4: 2, num7: 6, choice: 'pending'
    }]




    this.userForm = this.dataform.group({
      client: ['', Validators.required],
      num1: [0, Validators.required],
      num2: [0, Validators.required],
      num4: [0, Validators.required],
      num7: [0, Validators.required],
      num8: [0, Validators.required],
      choice: ['', Validators.required],
    })


  }


  onClick() {
    if (this.userForm.valid) {
      this.onselect.push(this.userForm.value),
        this.userForm.reset()





    }

  }

  onClear() {
    this.userForm.reset()
  }



  onEdit(index: number) {
    this.userForm.patchValue(this.onselect[index]);
    this.switch = true
    this.indexoftable = index;

  }

  onupdate() {
    this.onselect[this.indexoftable] = this.userForm.value
    this.userForm.reset();
    this.switch = false
  }
  calculateOverallTotal(): number {
    // Update the calculation to include num4 for profit
    return this.onselect.reduce((total: any, item: { num1: any; num2: any; num4: any; num8:any; }) => total + item.num1 + item.num2 + item.num4 + item.num8 ,0);
  }
  calculateOverallProfit(): number {
    return this.onselect.reduce((totalProfit: any, item: { num2: any; num4: any; num7: number;num8:any;  }) => totalProfit + item.num2 + item.num4 + item.num8 - item.num7, 0);
  }

  onClean(): void {

    this.showClearConfirmationDialog = true;
  }

  confirmClear(index: number) {
    this.onselect.splice(index, 1)
    this.showClearConfirmationDialog = false;
  }


  cancelClear(): void {
    // Hide the confirmation dialog
    this.showClearConfirmationDialog = false;
  }


 

}
