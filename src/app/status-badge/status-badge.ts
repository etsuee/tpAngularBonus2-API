import { Component, input } from '@angular/core';

// Defi intermediaire phase 3 : le badge sort de EmployeeCard pour etre reutilise.
@Component({
  imports: [],
  selector: 'app-status-badge',
  styleUrl: './status-badge.css',
  templateUrl: './status-badge.html',
})
export class StatusBadge {
  readonly remote = input.required<boolean>();
}
