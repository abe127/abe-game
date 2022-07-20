import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ProgressSpinnerComponent } from '../components/progress-spinner/progress-spinner.component';

@Injectable()
export class ProgressSpinnerService {
  private spinner: MatDialogRef<ProgressSpinnerComponent> | any;
  // すでに表示されているかどうか
  private shown: boolean = false;

  constructor(private dialog: MatDialog) {}

  public call(show: boolean) {
    // まだ表示されていなくて表示する場合
    if (!this.shown && show) {
      this.shown = true;
      this.spinner = this.dialog.open(ProgressSpinnerComponent, {
        height: '300px',
        width: '300px',
        panelClass: 'progress-spinner-pane',
        disableClose: true,
      });
    } else if (!show) {
      this.spinner.close();
      this.shown = false;
    }
  }
}
