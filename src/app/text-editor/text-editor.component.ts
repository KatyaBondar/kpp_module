import {
  Component, OnInit, Output, EventEmitter,
  Input, SimpleChanges, OnChanges
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { IonTextarea, IonButton, IonItem, IonAlert } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-text-editor',
  standalone: true,
  imports: [IonTextarea, IonButton, IonItem, ReactiveFormsModule, CommonModule, IonAlert],
  templateUrl: './text-editor.component.html',
  styleUrl: './text-editor.component.scss',
})
export class TextEditorComponent implements OnInit, OnChanges {
  @Output() textChanged = new EventEmitter<string>();
  @Input() initialText = '';

  textControl = new FormControl('');
  showAlert = false;
  alertMessage = '';

  ngOnInit() {
    this.textControl.setValue(this.initialText);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['initialText'] && this.initialText !== this.textControl.value) {
      this.textControl.setValue(this.initialText, { emitEvent: false });
    }
  }

  saveVersion() {
    const newText = this.textControl.value ?? '';

    if (!newText.trim()) {
      this.alertMessage = 'Text editor cannot be empty!';
      this.showAlert = true;
      return;
    }

    if (newText === this.initialText) {
      this.alertMessage = 'This version already exists!';
      this.showAlert = true;
      return;
    }

    this.textChanged.emit(newText);
  }
}

