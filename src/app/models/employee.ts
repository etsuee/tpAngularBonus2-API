// Forme d'un collegue : chaque objet Employee doit avoir ces proprietes.
export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  job: string;
  department: string;
  remote: boolean;
  // Defi avance phase 5 : facultatif (?), renseigne seulement en teletravail.
  remoteDays?: number;
}
