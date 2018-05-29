import { Component, OnInit, ViewChild } from '@angular/core';

declare var $: any;

import { UserService } from '../../services/user.service';
import { CoreUtils } from '../../utils/core.utils';
import { GridColumn, GridMenu, GridComponent } from '../../component/grid/grid.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  @ViewChild(GridComponent) gridComponent: GridComponent;
  title = 'Users Management';
  resetUrl = '';
  gridColumns: any[] = new Array();
  gridActions: any[] = new Array();
  funds: any[];

  constructor(public userService: UserService, public coreUtils: CoreUtils) { }

  ngOnInit() {
    window.dispatchEvent(new Event('resize'));
    this.initGrid();
  }
  showModal(): void {
    $('#myModal').modal('show');
  }

  menuActionNew(): void {
    $('#modalPopup').modal({
      keyboard: false
    });
    $('#modalPopup').modal('show');
    console.log('aaa');
  }

  menuActionEdit(): void {
    console.log(this.gridComponent.getSelectedRows());
  }

  menuActionDelete(): void {
    console.log(this.gridComponent.getSelectedRows());
  }

  cellClickAction(row): void {
    console.log(row);
  }

  getDateFormat(row, val): String {
    return this.coreUtils.getDateFormat(val);
  }

  initGrid(): void {
    this.resetUrl = this.userService.resetUrl + '/list';
    let nameCol: GridColumn = {title: 'User Name', filedName: 'user_name', width: '30%', columnFormat: null, display: true,
      click: this.cellClickAction.bind(this),
      sort: {enable: true, sortBy: 'user_name'}};
    this.gridColumns.push(nameCol);

    nameCol = {title: 'Email', filedName: 'email', width: '30%', columnFormat: null, display: true,
      click: null,
      sort: {enable: true, sortBy: 'email'}};
    this.gridColumns.push(nameCol);

    nameCol = {title: 'Active', filedName: 'active', width: '30%', columnFormat: null, display: true,
      click: this.cellClickAction.bind(this),
      sort: {enable: true, sortBy: 'active'}};
    this.gridColumns.push(nameCol);

    nameCol = {title: 'Creation Date', filedName: 'creation_date', width: '30%', columnFormat: this.getDateFormat.bind(this),
      display: false,
      click: null,
      sort: {enable: true, sortBy: 'creation_date'}};
    this.gridColumns.push(nameCol);

    nameCol = {title: 'Last Update Date', filedName: 'last_updated_date', width: '30%', columnFormat: this.getDateFormat.bind(this),
      display: false,
      click: null,
      sort: {enable: true, sortBy: 'last_updated_date'}};
    this.gridColumns.push(nameCol);

    // actions
     let gridMenu: GridMenu;
    gridMenu = {title: 'New', aClass: 'btn-primary', faIcon: 'fa fa-sticky-note-o',
      action: this.menuActionNew.bind(this), subMenus: []};
    this.gridActions.push(gridMenu);

    gridMenu = {title: 'Edit', aClass: 'btn-info', faIcon: 'fa fa-edit',
      action: this.menuActionEdit.bind(this), subMenus: []};
    this.gridActions.push(gridMenu);

    gridMenu = {title: 'Delete', aClass: 'btn-danger', faIcon: 'fa fa-trash',
      action: this.menuActionDelete.bind(this), subMenus: []};
    this.gridActions.push(gridMenu);

    // gridMenu = {title: 'More', aClass: 'btn-primary', faIcon: 'fa fa-trash',
    //   action: null, subMenus: [{title: 'More 1', action: this.menuActionDelete}, {title: 'More 2', action: this.menuActionDelete}]};
    // this.gridActions.push(gridMenu);
  }
}
