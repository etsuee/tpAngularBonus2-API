import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { StatusBadge } from '../../status-badge/status-badge';
import { TeamStore } from '../../team-store';

// Defi intermediaire phase 4 : la fiche d'un collegue, adresse /equipe/:id.
@Component({
  imports: [RouterLink, StatusBadge],
  selector: 'app-employee-detail',
  styleUrl: './employee-detail.css',
  templateUrl: './employee-detail.html',
})
export class EmployeeDetail {
  private readonly store = inject(TeamStore);

  // Le parametre :id de l'adresse, grace a withComponentInputBinding().
  // Une adresse est toujours du texte : on le convertit en nombre.
  readonly id = input.required<string>();

  protected readonly employee = computed(() => this.store.findById(Number(this.id())));
}
