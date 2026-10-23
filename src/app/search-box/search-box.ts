import { Component, model } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-search-box',
  styleUrl: './search-box.css',
  templateUrl: './search-box.html',
})
export class SearchBox {
  // model() : une valeur que le parent peut lire ET que ce composant peut modifier.
  readonly query = model('');
}
