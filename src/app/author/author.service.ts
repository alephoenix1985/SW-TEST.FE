import { Injectable } from '@angular/core';
import api from '../../core/helpers/api.helper';
import { throwError } from 'rxjs';
import uh from '../../core/helpers/util.helper';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  constructor() {
  }

  save(author) {
    if (author) {
      author.authorId = author.authorId || author.author && author.author.id;
      if (author.id) {
        return api.putBE('author/' + author.id, {author});
      } else {
        return api.postBE('author', {author});
      }
    } else {
      throwError('Bad Request');
    }
  }

  delete(author) {
    if (author && author.id) {
      return api.deleteBE('author/' + author.id);
    } else {
      throwError('Bad Request');
    }
  }


  list(options?) {
    return api.getBE('author', options && uh.cleanNestedObject(options));
  }
}
