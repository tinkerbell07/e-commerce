import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpqueryService } from '../services/httpquery.service';
import { LocationModalComponent } from './modal/locationmodal.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.less']
})
export class LocationsComponent implements OnInit {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  // dtTrigger: Subject<any> = new Subject();
  dtOptions: DataTables.Settings = {};
  by: string = "id";
  sort: string = "desc";
  locations: any;
  add: { location: string; };
  addlocation: boolean;
  constructor(private route: ActivatedRoute, private http: HttpqueryService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.dtOptions = {
      searching: true,
      pagingType: 'full_numbers',
      processing: true,
      lengthChange: true,
      ordering: true,
      responsive: false,
      info: true,
      paging: false,
      scrollY: "600",
    };
    this.getLocations();
    this.add = {
      location: '',
    }
  }
  getLocations() {
    this.http.params = {
      module: "locations",
      action: "index",
      by: this.by,
      sort: this.sort,
    }
    this.http.sendPost().subscribe((result: any) => {
      console.log(result.data.locations)
      this.locations = result.data.locations;
    })
  }



  sortBy(item: string) {
    alert(item)
    if (this.by == item) {
      if (this.sort == 'ask') this.sort = 'desc';
      else this.sort = 'ask';
    }
    else {
      this.by = item;
      this.sort = 'ask'
    }
    this.getLocations();
  }
  reset(location: any) {

  }
  createLocation() {

    this.http.params = {
      module: "locations",
      action: "addLocation",
      location: this.add.location,
    }
    this.http.sendPost().subscribe((result: any) => {
      if (result.data == true) {
        this.getLocations();
        this.cancelLocation();
      }
    })
  }
  updatelocations() {
    this.http.params = {
      module: "locations",
      action: "updatelocations",
    }
    this.http.sendPost().subscribe((result: any) => {
      if (result.data == true) {
        this.getLocations();

      }
    })
  }
  cancelLocation() {
    this.addlocation = false;
    this.add = {
      location: '',
    }
  }
  deleteLocation(location) {

    this.http.params = {
      module: "locations",
      action: "deleteLocation",
      id: location.id,
    }
    this.http.sendPost().subscribe((result: any) => {
      if (result == "ok")
        this.getLocations();
      window.location.reload();
    })
  }

  open () {
    const dialogRef = this.dialog.open(LocationModalComponent, {
      width: '450px',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.add.location = result.location
      if (result) {
        this.createLocation();
      }
      else {
        this.cancelLocation()
      }
    });
  }
}
