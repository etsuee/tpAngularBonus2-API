import { UpperCasePipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { LeaveCounter } from '../../leave-counter/leave-counter';

type Status = 'sur site' | 'en télétravail' | 'absent';

@Component({
  imports: [LeaveCounter, MatButton, UpperCasePipe],
  selector: 'app-home',
  styleUrl: './home.css',
  templateUrl: './home.html',
})
export class Home {
  protected readonly userName = 'Claire';
  protected message = '';

  protected readonly status = signal<Status>('sur site');

  // Defi avance phase 1 : le texte tape dans le champ d'essai.
  protected readonly typed = signal('');

  protected sayHello(): void {
    this.message = 'Bienvenue dans TechCorp Équipe, ' + this.userName + ' !';
  }

  // Defi intermediaire phase 1.
  protected clearMessage(): void {
    this.message = '';
  }

  protected changeStatus(newStatus: Status): void {
    this.status.set(newStatus);
  }
}
