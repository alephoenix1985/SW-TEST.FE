import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import api from '../../core/helpers/api.helper';
import uh from '../../core/helpers/util.helper';

@Injectable({
  providedIn: 'root'
})
export class PublicationService {

  constructor() {
  }

  save(publication) {
    if (publication) {
      publication.authorId = publication.authorId || publication.author && publication.author.id;
      if (publication.id) {
        return api.putBE('publication/' + publication.id, {publication});
      } else {
        return api.postBE('publication', {publication});
      }
    } else {
      throwError('Bad Request');
    }
  }

  delete(publication) {
    if (publication && publication.id) {
      return api.deleteBE('publication/' + publication.id);
    } else {
      throwError('Bad Request');
    }
  }


  list(options?) {
    return api.getBE('publication', uh.cleanNestedObject(options));
  }
}
