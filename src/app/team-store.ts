import { Service, computed, signal } from '@angular/core';
import { Employee } from './models/employee';

// Les donnees de l'equipe, partagees par toutes les pages.
@Service()
export class TeamStore {
  private readonly employeesSignal = signal<Employee[]>([
    {
      id: 1,
      firstName: 'Claire',
      lastName: 'Martin',
      email: 'claire.martin@techcorp.fr',
      job: 'Développeuse front-end',
      department: 'Informatique',
      remote: true,
      remoteDays: 2,
    },
    {
      id: 2,
      firstName: 'Julien',
      lastName: 'Bernard',
      email: 'julien.bernard@techcorp.fr',
      job: 'Chef de projet',
      department: 'Informatique',
      remote: false,
    },
    {
      id: 3,
      firstName: 'Sarah',
      lastName: 'Lefèvre',
      email: 'sarah.lefevre@techcorp.fr',
      job: 'Chargée RH',
      department: 'Ressources humaines',
      remote: false,
    },
  ]);

  // Lecture seule pour les composants : seul le store modifie la liste.
  readonly employees = this.employeesSignal.asReadonly();

  // Defi avance phase 4 : calcule une seule fois ici, utilisable par toutes les pages.
  readonly remoteCount = computed(
    () => this.employees().filter((employee) => employee.remote).length,
  );

  // Prochain identifiant libre : 3 collegues au depart.
  private nextId = 4;

  add(employee: Omit<Employee, 'id'>): void {
    const newEmployee: Employee = { ...employee, id: this.nextId++ };
    this.employeesSignal.update((list) => [...list, newEmployee]);
  }

  remove(id: number): void {
    this.employeesSignal.update((list) => list.filter((employee) => employee.id !== id));
  }

  // Defi intermediaire phase 4 : undefined si aucun collegue n'a cet identifiant.
  findById(id: number): Employee | undefined {
    return this.employees().find((employee) => employee.id === id);
  }
}
