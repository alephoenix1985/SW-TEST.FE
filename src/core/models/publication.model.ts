import mh from '../helpers/model.helper';
import uh from '../helpers/util.helper';

export class Publication {
    id: string;
    body: string;
    authorId: string;
    author: any;
    title: string;
    publishedAt: any;
    createdAt: string;
    updatedAt: string;
    deletedAt: string;

    constructor(data: any = {}) {
        const timestamp = new Date().toISOString();
        const {id, authorId, body, title, publishedAt} = data;

        this.id = id;
        this.body = body;
        this.authorId = authorId;
        this.title = title;
        this.publishedAt = publishedAt && uh.parseDate(publishedAt).value;

        this.createdAt = timestamp;
        this.updatedAt = timestamp;
        this.deletedAt = null;
    }

    get validate() {
        const validations = [
            {path: 'publishedAt', validator: 'REQUIRED', type: 'date', field: 'Date when it was published'},
            {path: 'authorId', validator: 'REQUIRED', field: 'Author'},
            {path: 'body', validator: 'REQUIRED', field: 'Publication Body'},
            {path: 'title', validator: 'REQUIRED', field: 'Publication  Title'}
        ];
        return mh.validate(validations, this);
    }

    clean() {
        const model: any = Object.assign({}, this);
        delete model.validate;
        return model;
    }
}
