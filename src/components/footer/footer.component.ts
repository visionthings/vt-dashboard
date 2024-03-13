import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent implements OnInit {
  // Current Year
  currentYear: number | undefined = undefined;

  ngOnInit(): void {
    // Get current year
    let date = new Date();
    this.currentYear = date.getFullYear();
  }
}
