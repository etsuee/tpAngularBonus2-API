import { Component, computed, inject, signal } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { EmployeeCard } from '../../employee-card/employee-card';
import { SearchBox } from '../../search-box/search-box';
import { TeamStore } from '../../team-store';

@Component({
  imports: [EmployeeCard, MatIcon, MatIconButton, SearchBox],
  selector: 'app-team-page',
  styleUrl: './team-page.css',
  templateUrl: './team-page.html',
})
export class TeamPage {
  // inject() : Angular fournit l'instance unique du service.
  private readonly store = inject(TeamStore);

  protected readonly search = signal('');

  // Defi avance phase 4 : le filtre est un etat de CETTE page, pas une donnee partagee.
  protected readonly department = signal('');

  // Defi intermediaire phase 3 et avance phase 4 : le resume de l'equipe.
  protected readonly employeeCount = computed(() => this.store.employees().length);
  protected readonly remoteCount = this.store.remoteCount;

  // La liste des services, sans doublon, deduite des collegues.
  protected readonly departments = computed(() => [
    ...new Set(this.store.employees().map((employee) => employee.department)),
  ]);

  protected readonly filteredEmployees = computed(() => {
    const text = this.search().trim().toLowerCase();
    const department = this.department();
    return this.store
      .employees()
      .filter((employee) =>
        (employee.firstName + ' ' + employee.lastName).toLowerCase().includes(text),
      )
      .filter((employee) => department === '' || employee.department === department);
  });

  protected remove(id: number): void {
    this.store.remove(id);
  }
}
