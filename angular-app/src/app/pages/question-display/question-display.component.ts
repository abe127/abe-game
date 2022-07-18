import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-question-display',
  templateUrl: './question-display.component.html',
  styleUrls: ['./question-display.component.scss'],
})
export class QuestionDisplayComponent implements OnInit {
  questionSentence = '好きな食べ物は？';

  constructor() {}

  ngOnInit(): void {}
}
