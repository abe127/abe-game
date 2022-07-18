import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reception',
  templateUrl: './reception.component.html',
  styleUrls: ['./reception.component.scss'],
})
export class ReceptionComponent implements OnInit {
  items = [
    {
      title: 'ステップ1：LINE公式アカウントを友達登録する',
      is_accordion: true,
    },
    {
      title: 'ステップ2：表示名を設定する',
      is_accordion: false,
    },
    {
      title: 'ステップ3：部屋に参加する',
      is_accordion: true,
    },
  ];
  expandedIndex = 0;

  constructor() {}

  ngOnInit(): void {}

  clickToggle(is_accordion: boolean, accordionItem: any) {
    if (!is_accordion) return;

    accordionItem.toggle();
  }
}
