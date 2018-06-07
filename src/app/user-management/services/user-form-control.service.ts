import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormModel } from '../models/user-forms.model'

@Injectable()
export class UserFormControlService {

  constructor() { }
  toFormGroup(userFormFields: FormModel<any>[]) {
    let group: any = {};
    console.log(userFormFields);
    if (userFormFields)
      userFormFields.forEach(userFields => {
        group[userFields.key] = userFields.required ? new FormControl(userFields.value || '', Validators.required)
          : new FormControl(userFields.value || '');
      });
    return new FormGroup(group);
  }

}