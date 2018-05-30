import { Component, OnInit, ViewChild } from '@angular/core';

declare var $: any;

import { UserService } from '../../services/user.service';
import { RoleService } from '../../services/role.service';
import { CoreUtils } from '../../utils/core.utils';
import { GridColumn, GridMenu, GridComponent } from '../../component/grid/grid.component';

interface IRole {
  role_name: string;
  description: string;
  creation_date: null;
  created_by: string;
  last_updated_date: null;
  last_updated_by: string;
}

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {
  @ViewChild(GridComponent) gridComponent: GridComponent;
  title = 'Roles Management';
  resetUrl = '';
  gridColumns: any[] = new Array();
  gridActions: any[] = new Array();
  funds: any[];
  role: IRole = {role_name: '', description: '', creation_date: null, created_by: '', last_updated_date: null, last_updated_by: ''};

  constructor(public coreUtils: CoreUtils,
    public roleService: RoleService
  ) { }

  ngOnInit() {
    window.dispatchEvent(new Event('resize'));
    this.initGrid();
  }

  menuActionNew(): void {
    this.role = {role_name: '', description: '', creation_date: null, created_by: '', last_updated_date: null, last_updated_by: ''};
    $('#myModal').modal('show');
  }

  save(): void {
    const $btn = $('#saveButton').button('loading');
    this.roleService.save(this.role).then( response => {
      if (response.success) {
        $btn.button('reset');
        if ($('#myModal').modal('hide')) {
          this.gridComponent.loadGrid(1);
        }
      }
    }).catch(e => {
      $btn.button('reset');
    });
  }

  menuActionEdit(): void {
    console.log(this.gridComponent.getSelectedRows());
  }

  menuActionDelete(): void {
    const selectedIds = this.gridComponent.getSelectedIds();
    this.roleService.delete(selectedIds).then( response => {
      if (response.success) {
        this.gridComponent.loadGrid(1);
      }
    });
  }

  cellClickAction(row): void {
    console.log(row);
  }

  getDateFormat(row, val): String {
    return this.coreUtils.getDateFormat(val);
  }

  initGrid(): void {
    this.resetUrl = this.roleService.resetUrl + '/list';
    let nameCol: GridColumn = {title: 'Role Name', filedName: 'role_name', width: '30%', columnFormat: null, display: true,
      click: this.cellClickAction.bind(this),
      sort: {enable: true, sortBy: 'role_name'}};
    this.gridColumns.push(nameCol);

    nameCol = {title: 'Description', filedName: 'description', width: '65%', columnFormat: null, display: true,
      click: null,
      sort: {enable: false, sortBy: ''}};
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
