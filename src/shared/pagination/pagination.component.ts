import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
})
export class PaginationComponent implements OnChanges {
  @Input() res: any;
  @Output() newPageEvent = new EventEmitter<string>();
  links: any = [];
  setPage(page: string) {
    this.newPageEvent.emit(page);
  }
  icons = {
    prev: faAngleRight,
    next: faAngleLeft,
  };
  ngOnChanges(changes: SimpleChanges): void {
    this.links = this.res.links.slice(1, -1);
  }
}
