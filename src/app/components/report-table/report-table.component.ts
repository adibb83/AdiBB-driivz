import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { SataService } from '@services/sata.service';

@Component({
  selector: 'app-report-table',
  templateUrl: './report-table.component.html',
  styleUrls: ['./report-table.component.scss'],
})
export class ReportTableComponent implements OnInit, AfterViewInit {
  dataSource = new MatTableDataSource();
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = [
    'id',
    'name',
    'timestamp',
    'iss_position.latitude',
    'iss_position.longitude',
  ];
  constructor(public sataService: SataService) {}

  ngOnInit(): void {
    this.dataSource.data = this.sataService.sataLocationLog;
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
}
