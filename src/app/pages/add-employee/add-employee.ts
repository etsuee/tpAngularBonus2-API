import { Component, inject, signal } from '@angular/core';
import {
  FormField,
  FormRoot,
  email,
  form,
  max,
  maxLength,
  min,
  minLength,
  required,
  validate,
} from '@angular/forms/signals';
import { MatButton } from '@angular/material/button';
import { Router } from '@angular/router';
import { TeamStore } from '../../team-store';
import { HasUnsavedChanges } from '../../unsaved-changes-guard';

// Le modele du formulaire : une propriete par champ.
interface EmployeeDraft {
  firstName: string;
  lastName: string;
  email: string;
  job: string;
  department: string;
  remote: boolean;
  // null tant que le champ est vide.
  remoteDays: number | null;
}

const EMPTY_DRAFT: EmployeeDraft = {
  firstName: '',
  lastName: '',
  email: '',
  job: '',
  department: 'Informatique',
  remote: false,
  remoteDays: null,
};

const COMPANY_DOMAIN = '@techcorp.fr';

@Component({
  imports: [FormField, FormRoot, MatButton],
  selector: 'app-add-employee',
  styleUrl: './add-employee.css',
  templateUrl: './add-employee.html',
})
export class AddEmployee implements HasUnsavedChanges {
  private readonly store = inject(TeamStore);
  private readonly router = inject(Router);

  protected readonly departments = ['Informatique', 'Ressources humaines', 'Commercial'];

  // Defi intermediaire phase 5 : vrai apres une tentative d'envoi invalide.
  protected readonly submitAttempted = signal(false);

  // 1. Le modele : un signal qui contient toutes les valeurs du formulaire.
  private readonly draft = signal<EmployeeDraft>({ ...EMPTY_DRAFT });

  // 2. Le formulaire : construit a partir du modele, avec ses regles de validation.
  protected readonly employeeForm = form(
    this.draft,
    (path) => {
      required(path.firstName, { message: 'Le prénom est obligatoire.' });
      required(path.lastName, { message: 'Le nom est obligatoire.' });
      minLength(path.lastName, 2, { message: 'Le nom doit contenir au moins 2 lettres.' });
      required(path.email, { message: "L'e-mail est obligatoire." });
      email(path.email, {
        message: "L'e-mail n'est pas valide (exemple : prenom.nom@techcorp.fr).",
      });

      // Defi avance phase 5 : regle personnalisee, le domaine de l'entreprise.
      validate(path.email, ({ value }) =>
        value() && !value().toLowerCase().endsWith(COMPANY_DOMAIN)
          ? { kind: 'domain', message: `L'e-mail doit se terminer par ${COMPANY_DOMAIN}.` }
          : undefined,
      );

      // Defi avance phase 5 : la regle lit aussi les donnees du service.
      validate(path.email, ({ value }) => {
        const address = value().trim().toLowerCase();
        const taken = this.store
          .employees()
          .some((employee) => employee.email.toLowerCase() === address);
        return taken
          ? { kind: 'duplicate', message: 'Cet e-mail est déjà utilisé par un collègue.' }
          : undefined;
      });

      required(path.job, { message: 'Le poste est obligatoire.' });
      maxLength(path.job, 40, { message: 'Le poste ne doit pas dépasser 40 caractères.' });

      // Defi avance phase 5 : obligatoire seulement si la case est cochee.
      required(path.remoteDays, {
        when: ({ valueOf }) => valueOf(path.remote),
        message: 'Indiquez le nombre de jours de télétravail.',
      });
      min(path.remoteDays, 1, { message: 'Au moins 1 jour de télétravail.' });
      max(path.remoteDays, 5, { message: 'Au plus 5 jours de télétravail.' });
    },
    {
      submission: {
        action: async () => this.save(),
        // Appele a la place de action quand le formulaire est invalide.
        onInvalid: () => this.submitAttempted.set(true),
      },
    },
  );

  hasUnsavedChanges(): boolean {
    return this.employeeForm().dirty();
  }

  protected resetForm(): void {
    // reset() remet les valeurs ET efface l'etat "touche" des champs.
    this.employeeForm().reset({ ...EMPTY_DRAFT });
    this.submitAttempted.set(false);
  }

  private async save(): Promise<void> {
    const { remote, remoteDays, ...rest } = this.draft();
    // Le nombre de jours n'a de sens qu'en teletravail.
    this.store.add({ ...rest, remote, remoteDays: remote ? (remoteDays ?? undefined) : undefined });
    // Le formulaire redevient "non modifie" : le guard laisse partir l'utilisateur.
    this.resetForm();
    await this.router.navigate(['/equipe']);
  }
}
