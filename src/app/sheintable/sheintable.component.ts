import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sheintable',
  templateUrl: './sheintable.component.html',
  styleUrl: './sheintable.component.css'
})
export class SheintableComponent {
  userdata!: FormGroup;
  showClearConfirmationDialog = false;
  tableData: any[] = [];
  nextId = 1;
  number1: number = null!;
  number2: number = null!;
  number4: number = null!;
  number7: number = null!;
  result: number = 0;


  editRow(index: number): void {
    const selectedRowData = this.tableData[index];

    // Set the form values based on the selected row data
    this.userdata.patchValue({
      client: selectedRowData.client,
      items: selectedRowData.items,
      num1: selectedRowData.num1,
      num2: selectedRowData.num2,
      num4: selectedRowData.num4,
      num7: selectedRowData.num7, // Added line for num4
      choice: selectedRowData.choice,
    });

    // Remove the selected row from the table data
    this.tableData.splice(index, 1);
  }

  constructor(private datalist: FormBuilder) {

    this.tableData = [
      { id: 1, client: 'Marvel', items: 3, num1: 3, num2: 5, num4: 2, num7: 6, choice: 'pending' },
      // Add more initial data if needed
    ];


    this.userdata = this.datalist.group({
      client: ['', Validators.required],
      items: ['', Validators.required],
      num1: [0, Validators.required],
      num2: [0, Validators.required],
      num4: [0, Validators.required],
      num7: [0, Validators.required],
      choice: ['', Validators.required],
    });
  }

  onClick() {
    if (this.userdata.valid) {
      // If the form is valid, add the values to the tableData array with a unique ID
      const newItem = { id: this.nextId++, ...this.userdata.value };
      this.tableData.push(newItem);

      // Reset the form
      this.userdata.reset();
    }

    // Update the result based on the form values
    this.result = this.userdata.value.num1 + this.userdata.value.num2;
  }

  onClear() {
    if (this.tableData.length > 0) {
      // Remove the last row from the tableData array
      this.tableData.splice(-1, 1);
    }

    // Reset the form
    this.userdata.reset();

    // Update the result based on the form values
    this.result = this.userdata.value.num1 + this.userdata.value.num2;
  }


  calculateOverallTotal(): number {
    // Update the calculation to include num4 for profit
    return this.tableData.reduce((total, item) => total + item.num1 + item.num2 + item.num4, 0);
  }
  calculateOverallProfit(): number {
    return this.tableData.reduce((totalProfit, item) => totalProfit + item.num2 + item.num4  - item.num7, 0);
  }
  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.userdata = this.datalist.group({
      client: ['', Validators.required],
      items: ['', Validators.required],
      num1: [0, Validators.required],
      num2: [0, Validators.required],
      num4: [0, Validators.required],
      num7: [0 , Validators.required],
      choice: ['', Validators.required],
    });
  }

  clearTable(): void {
    // Show the confirmation dialog
    this.showClearConfirmationDialog = true;
  }

  confirmClear(): void {
    if (this.tableData.length > 0) {
      // Remove the last row from the tableData array
      this.tableData.splice(-1, 1);
    }
  
    // Hide the confirmation dialog
    this.showClearConfirmationDialog = false;
  
    // Reset the form
    this.userdata.reset();
  
    // Update the result based on the form values
    this.result = this.userdata.value.num1 + this.userdata.value.num2;
  }
  

  cancelClear(): void {
    // Hide the confirmation dialog
    this.showClearConfirmationDialog = false;
  }

  // ... other methods ...

}
