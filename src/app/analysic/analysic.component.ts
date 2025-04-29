import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-analysic',
  templateUrl: './analysic.component.html',
  styleUrls: ['./analysic.component.sass']
})
export class AnalysicComponent implements OnInit {
  salesData: any[] = [];

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
        this.calculateAnalytics();
        console.log('Loaded sales data for analytics:', this.salesData);
      }
    });
  }

  calculateAnalytics() {
    if (!this.salesData || this.salesData.length === 0) return;

    this.totalSales = this.salesData.reduce((acc, row) => acc + row.num1, 0);
    this.totalProfit = this.salesData.reduce(
      (acc, row) => acc + (row.num4 + row.num2 + row.num8 - row.num7),
      0
    );
    this.totalItems = this.salesData.reduce((acc, row) => acc + row.num8, 0);
    this.averageCost = this.totalItems > 0 ? this.totalSales / this.totalItems : 0;
    this.pendingCount = this.salesData.filter(row => row.choice === 'Pending').length;
    this.doneCount = this.salesData.filter(row => row.choice === 'Done').length;
  }
}
