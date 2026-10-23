import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Employee } from '../models/employee';
import { StatusBadge } from '../status-badge/status-badge';

@Component({
  imports: [RouterLink, StatusBadge],
  selector: 'app-employee-card',
  styleUrl: './employee-card.css',
  templateUrl: './employee-card.html',
})
export class EmployeeCard {
  // Donnee recue du parent : <app-employee-card [employee]="..." />
  readonly employee = input.required<Employee>();

  // Defi avance phase 3 : entree facultative, false si le parent ne la donne pas.
  readonly compact = input(false);

  // Defi avance phase 3 : "CM" pour Claire Martin.
  protected readonly initials = computed(() => {
    const { firstName, lastName } = this.employee();
    return (firstName.charAt(0) + lastName.charAt(0)).toUpperCase();
  });
}
