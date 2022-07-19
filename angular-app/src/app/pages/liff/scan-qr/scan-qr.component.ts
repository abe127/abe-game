import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import liff from '@line/liff';
import { environment } from 'src/environments/environment';
import { MainService } from 'src/app/services/main.service';
import { ProgressSpinnerService } from 'src/app/services/progress-spinner.service';

@Component({
  selector: 'app-scan-qr',
  templateUrl: './scan-qr.component.html',
  styleUrls: ['./scan-qr.component.scss'],
  providers: [Title],
})
export class ScanQrComponent implements OnInit {
  public roomInfo: any;

  constructor(
    private title: Title,
    private mainSvc: MainService,
    private spinnerSvc: ProgressSpinnerService
  ) {
    this.title.setTitle('QRコードリーダー');
    this.spinnerSvc.call(true);

    liff
      .init({
        liffId: environment.LIFF_ID,
        withLoginOnExternalBrowser: true,
      })
      .then(() => {
        this.spinnerSvc.call(false);
        this.scanQr();
      });
  }

  ngOnInit(): void {}

  scanQr() {
    this.spinnerSvc.call(true);
    liff
      .scanCodeV2()
      .then((result) => {
        this.spinnerSvc.call(false);
        const roomId = result.value;
        if (roomId) {
          const query = {
            filters: {
              room_id: {
                $eq: roomId,
              },
            },
          };
          this.mainSvc.getRoom(query).subscribe((result) => {
            this.spinnerSvc.call(false);
            console.log(result);
            if (result.data.length) {
              this.roomInfo = result.data[0];
            } else {
              this.roomInfo = null;
            }
          });
        }
      })
      .catch((error) => {
        this.spinnerSvc.call(false);
        // this.test = error;
      });
  }

  join() {
    const idToken = liff.getIDToken();
    this.mainSvc.joinRoom(this.roomInfo.id, idToken).subscribe((result) => {
      // console.log(result);
      liff.closeWindow();
    });
  }
}
