import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../../services/dashboard.service';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-inbox',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './inbox.component.html',
  styleUrl: './inbox.component.scss',
})
export class InboxComponent implements OnInit {
  constructor(private dashboardService: DashboardService) {}

  icons = {
    delete: faTrash,
  };

  messages: any = undefined;
  isMessagesLoaded: boolean = false;
  currentMessage: any = undefined;

  setCurrentMessage(message: string) {
    this.currentMessage = message;
  }
  deleteMessage(messageID: string) {
    this.dashboardService.deleteMessage(messageID).subscribe({
      next: () => {
        this.dashboardService.getMessages().subscribe({
          next: (res) => {
            this.messages = res;
          },
        });
      },
    });
  }

  ngOnInit(): void {
    this.dashboardService.getMessages().subscribe({
      next: (res) => {
        this.messages = res;
      },
      complete: () => {
        this.isMessagesLoaded = true;
      },
    });
  }
}
