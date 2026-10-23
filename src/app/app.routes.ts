import { Routes } from '@angular/router';
import { EmployeeDetail } from './pages/employee-detail/employee-detail';
import { Home } from './pages/home/home';
import { TeamPage } from './pages/team-page/team-page';
import { unsavedChangesGuard } from './unsaved-changes-guard';

export const routes: Routes = [
  { path: '', title: 'Accueil | TechCorp Équipe', component: Home },
  { path: 'equipe', title: 'Équipe | TechCorp Équipe', component: TeamPage },
  // Defi intermediaire phase 4 : :id est un parametre, il prend n'importe quelle valeur.
  { path: 'equipe/:id', title: 'Fiche collègue | TechCorp Équipe', component: EmployeeDetail },
  {
    path: 'ajouter',
    title: 'Ajouter un collègue | TechCorp Équipe',
    // Defi avance phase 4 : le code de la page n'est telecharge qu'a la premiere visite.
    loadComponent: () => import('./pages/add-employee/add-employee').then((m) => m.AddEmployee),
    // Defi avance phase 5 : confirmation avant de quitter un formulaire modifie.
    canDeactivate: [unsavedChangesGuard],
  },
  // Toute autre adresse renvoie vers l'accueil. Toujours en dernier.
  { path: '**', redirectTo: '' },
];
