import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-analysic',
  templateUrl: './analysic.component.html',
  styleUrls: ['./analysic.component.sass']
})
export class AnalysicComponent implements OnInit {
  salesData: any[] = [];
  filteredSalesData: any[] = [];
  statusFilter: string = 'All';  // Default filter to show all data

  totalSales = 0;
  totalProfit = 0;
  averageCost = 0;
  totalItems = 0;
  pendingCount = 0;
  doneCount = 0;

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit() {
    this.firebaseService.getUserData().subscribe((doc: any) => {
      if (doc?.data) {
        this.salesData = doc.data;
        this.filteredSalesData = this.salesData;  // Default to show all sales
        this.calculateAnalytics();
        console.log('Loaded sales data for analytics:', this.salesData);
      }
    });
  }

  calculateProfit(item: any): number {
    const discountAmount = (item.cost * item.discount) / 100;
    let profit = discountAmount + item.delivery - item.shippingCost;

    // Add quantity to profit if checkbox is checked
    if (item.includeQuantityInProfit) {
      profit += item.quantity;
    }

    return profit;
  }

  calculateAnalytics() {
    if (!this.salesData || this.salesData.length === 0) return;

    // Calculating total sales
    this.totalSales = this.salesData.reduce((acc, row) => acc + row.cost, 0);

    // Calculating total profit using the calculateProfit method
    this.totalProfit = this.salesData.reduce(
      (acc, row) => acc + this.calculateProfit(row),
      0
    );

    // Calculating total items sold
    this.totalItems = this.salesData.reduce((acc, row) => acc + row.quantity, 0);

    // Calculating average cost per item
    this.averageCost = this.totalItems > 0 ? this.totalSales / this.totalItems : 0;

    // Counting how many items are pending and done
    this.pendingCount = this.salesData.filter(row => row.choice === 'Pending').length;
    this.doneCount = this.salesData.filter(row => row.choice === 'Done').length;
  }

  filterByStatus(status: string) {
    if (status === 'All') {
      this.filteredSalesData = this.salesData;
    } else {
      this.filteredSalesData = this.salesData.filter(row => row.choice === status);
    }
    this.calculateAnalytics();  // Recalculate analytics based on filtered data
  }
}
