import { AfterContentChecked, Injector, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators }    from '@angular/forms';
import { ActivatedRoute, Router }                from '@angular/router';

import { switchMap }           from 'rxjs/operators';
import toastr                  from 'toastr';
import { BaseResourceService } from '../../services/base-resource.service';
import { BaseResource }        from '../../models/base-resource.model';

export abstract class BaseResourceFormComponent<T extends BaseResource> implements OnInit, AfterContentChecked {

  currentAction: string;
  resourceForm: FormGroup;
  pageTitle: string;
  serverErrorMessages: string[] = null;
  submittingForm: boolean = false;

  protected route: ActivatedRoute;
  protected router: Router;
  protected formBuilder: FormBuilder;

  protected constructor(
    protected injector: Injector,
    public resource: T,
    protected jsonDataToResourceFn: (jsonData: any) => T,
    protected baseResourceService: BaseResourceService<T>,
  ) {
    this.route = injector.get(ActivatedRoute);
    this.router = injector.get(Router);
    this.formBuilder = injector.get(FormBuilder);
  }

  ngOnInit() {
    this.setCurrentAction();
    this.buildResourceForm();
    this.loadResource();
  }

  ngAfterContentChecked(): void {
    this.setPageTitle();
  }

  submitForm() {
    this.submittingForm = true;
    if (this.currentAction == 'new')
      this.createResource();
    else
      this.updateResource();
  }

  // PRIVATE METHODS

  protected setCurrentAction() {
    if (this.route.snapshot.url[0].path == 'new') {
      this.currentAction = 'new';
    } else {
      this.currentAction = 'edit';
    }
  }

  protected loadResource() {
    if (this.currentAction == 'edit') {
      this.route.paramMap.pipe(
        switchMap(params => this.baseResourceService.getById(+params.get('id'))),
      ).subscribe(
        (resource: T) => {
          this.resource = resource;
          this.resourceForm.patchValue(resource);
        },
        () => alert('Ocorreu um erro no servidor, tente novamente mais tarde'),
      );
    }
  }

  protected setPageTitle() {
    if (this.currentAction == 'new')
      this.pageTitle = this.creationPageTitle();
    else
      this.pageTitle = this.editionPageTitle();
  }

  protected createResource() {
    const resource: T = this.jsonDataToResourceFn(this.resourceForm.value);
    this.baseResourceService.create(resource).subscribe(
      category => this.actionForSuccess(category),
      error => this.actionForError(error),
    );
  }

  protected updateResource() {
    const resource: T = this.jsonDataToResourceFn(this.resourceForm.value);
    this.baseResourceService.update(resource).subscribe(
      category => this.actionForSuccess(category),
      error => this.actionForError(error),
    );
  }

  protected actionForSuccess(resource: T) {
    toastr.success('Solicitação processada com sucesso!');
    const baseComponentPath = this.route.snapshot.parent.url[0].path;

    // reload component
    this.router.navigateByUrl(baseComponentPath, {skipLocationChange: true}).then(
      () => this.router.navigate([baseComponentPath, resource.id, 'edit']),
    );
  }

  protected actionForError(error: any) {
    toastr.error('Ocorreu um erro ao processar a sua solicitação!');

    this.submittingForm = false;

    if (error.status === 422)
      this.serverErrorMessages = JSON.parse(error._body).errors;
    else
      this.serverErrorMessages = ['Falha na comunicação com o servidor!'];
  }

  protected creationPageTitle(): string {
    return 'Novo';
  }

  protected editionPageTitle(): string {
    return 'Edição';
  }

  protected abstract buildResourceForm(): void;
}
