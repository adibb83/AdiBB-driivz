import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ISata } from '@models/sata.model';

import { SataService } from '@services/sata-service/sata.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-report-table',
  templateUrl: './report-table.component.html',
  styleUrls: ['./report-table.component.scss'],
})
export class ReportTableComponent implements OnInit, AfterViewInit {
  dataSource = new MatTableDataSource();
  dataSource$!: Observable<ISata[]>;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = [
    'id',
    'name',
    'timestamp',
    'iss_position.latitude',
    'iss_position.longitude',
    'deleteLog',
  ];
  constructor(public sataService: SataService) {
    this.dataSource$ = this.sataService.savedLocations$;
  }

  ngOnInit(): void {
    // this.dataSource.data = this.sataService.savedLocations$;
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  deleteLog(event: ISata) {
    this.sataService.deleteLocationFromLog(
      event,
      this.sataService.sataLocationLog
    );
  }
}
