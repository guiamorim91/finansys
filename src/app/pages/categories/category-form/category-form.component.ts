import { Component, Injector }                from '@angular/core';
import { Validators } from '@angular/forms';

import { Category }                  from '../shared/category.model';
import { CategoryService }           from '../shared/category.service';
import { BaseResourceFormComponent } from '../../../shared/components/base-resource-form/base-resource-form.component';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css'],
})
export class CategoryFormComponent extends BaseResourceFormComponent<Category> {

  constructor(protected categoryService: CategoryService, protected injector: Injector) {
    super(injector, new Category(), Category.fromJson, categoryService);
  }

  protected buildResourceForm() {
    this.resourceForm = this.formBuilder.group({
      id: [null],
      name: [null, [Validators.required, Validators.minLength(2)]],
      description: [null],
    });
  }

  protected creationPageTitle(): string {
    return 'Cadastro de Nova Categoria';
  }

  protected editionPageTitle(): string {
    const categoryName = this.resource.name || '';
    return 'Editando Categoria: ' + categoryName;
  }
}
