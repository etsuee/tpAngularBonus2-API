import { Component, computed, signal } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';

@Component({
  imports: [MatButton, MatCard, MatCardContent, MatCardHeader, MatCardTitle],
  selector: 'app-leave-counter',
  styleUrl: './leave-counter.css',
  templateUrl: './leave-counter.html',
})
export class LeaveCounter {
  protected readonly totalDays = 25;
  protected readonly daysTaken = signal(0);

  // Recalcules automatiquement quand daysTaken change.
  protected readonly remainingDays = computed(() => this.totalDays - this.daysTaken());
  protected readonly isEmpty = computed(() => this.remainingDays() === 0);

  // Defi intermediaire phase 2 : pourcentage de jours poses, arrondi.
  protected readonly usedPercent = computed(() =>
    Math.round((this.daysTaken() / this.totalDays) * 100),
  );

  // Defi avance phase 2 : le journal des actions, du plus ancien au plus recent.
  protected readonly history = signal<string[]>([]);

  protected addDay(): void {
    this.daysTaken.update((days) => days + 1);
    this.log('+1 jour');
  }

  // Defi avance phase 2 : +5 jours, sans jamais depasser le total.
  protected addWeek(): void {
    this.daysTaken.update((days) => Math.min(days + 5, this.totalDays));
    this.log('+1 semaine');
  }

  protected removeDay(): void {
    this.daysTaken.update((days) => days - 1);
    this.log('-1 jour');
  }

  protected reset(): void {
    this.daysTaken.set(0);
    this.log('Remise à zéro');
  }

  // Un NOUVEAU tableau a chaque fois : push() modifierait l'ancien,
  // le signal recevrait la meme reference et ne previendrait personne.
  private log(action: string): void {
    this.history.update((lines) => [...lines, action]);
  }
}
