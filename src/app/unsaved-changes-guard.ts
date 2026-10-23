import { CanDeactivateFn } from '@angular/router';

// Defi avance phase 5 : toute page qui veut etre protegee fournit cette methode.
export interface HasUnsavedChanges {
  hasUnsavedChanges(): boolean;
}

// true : on laisse partir. false : on reste sur la page.
export const unsavedChangesGuard: CanDeactivateFn<HasUnsavedChanges> = (component) =>
  !component.hasUnsavedChanges() ||
  confirm('Le formulaire contient des modifications. Quitter la page sans enregistrer ?');
