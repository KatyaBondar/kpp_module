import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TextEditorComponent } from '../text-editor/text-editor.component';
import { HistoryService } from '../services/history.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, IonicModule, TextEditorComponent],
  templateUrl: './home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  history: string[] = [];
  currentText = '';

  constructor(private historyService: HistoryService) {}

  onTextChanged(newText: string) {
    this.currentText = newText;

    const lastVersion = this.history[this.history.length - 1];
    if (newText !== lastVersion) {
      this.historyService.addVersion(newText);
      this.history = this.historyService.getHistory();
    }
  }

  restoreVersion(index: number) {
    const version = this.historyService.restoreVersion(index);
    this.currentText = version;
  }
}
