import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  private history: string[] = [];

  addVersion(version: string) {
    if (!this.history.includes(version)) {
      this.history.push(version);
    }
  }

  getHistory(): string[] {
    return [...this.history];
  }

  restoreVersion(index: number): string {
    return this.history[index];
  }
}
