import { OnInit } from '@angular/core';

import { BaseResource }        from '../../models/base-resource.model';
import { BaseResourceService } from '../../services/base-resource.service';

export abstract class BaseResourceListComponent<T extends BaseResource> implements OnInit {

  resources: T[] = [];

  protected constructor(private baseResourceService: BaseResourceService<T>) { }

  ngOnInit() {
    this.baseResourceService.getAll().subscribe(
      resources => this.resources = resources,
      error => alert('Erro ao carregar lista')
    );
  }

  deleteResource(resource: T) {
    const mustDelete = confirm('Deseja realmente excluir este item?');

    if (mustDelete) {
      this.baseResourceService.delete(resource.id).subscribe(
        () => this.resources = this.resources.filter(element => element != resource),
        () => alert('Error')
      );
    }
  }

}
