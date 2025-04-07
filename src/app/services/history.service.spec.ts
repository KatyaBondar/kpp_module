import { TestBed } from '@angular/core/testing';
import { HistoryService } from './history.service';

describe('HistoryService', () => {
  let service: HistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HistoryService);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should add and retrieve versions correctly', () => {
    service.addVersion('First');
    service.addVersion('Second');
    expect(service.getHistory()).toEqual(['First', 'Second']);
  });

  it('should not duplicate the same text', () => {
    service.addVersion('Same');
    service.addVersion('Same');
    expect(service.getHistory()).toEqual(['Same']);
  });

  it('should restore the correct version', () => {
    service.addVersion('A');
    service.addVersion('B');
    expect(service.restoreVersion(0)).toBe('A');
    expect(service.restoreVersion(1)).toBe('B');
  });
});
