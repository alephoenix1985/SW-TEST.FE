import mh from '../helpers/model.helper';
import uh from '../helpers/util.helper';

export class Author {
    id: string;
    name: string;
    email: string;
    birthDate: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: null;

    constructor(data: any = {}) {
        const date = new Date().toISOString();
        const {id, name, email, birthDate} = data;
        this.id = id;
        this.name = name;
        this.email = email;
        this.birthDate = birthDate && uh.parseDate(birthDate).value;

        this.createdAt = date;
        this.updatedAt = date;
        this.deletedAt = null;
    }

    get validate() {
        const validations = [
            {path: 'name', validator: 'REQUIRED', field: 'Name'},
            {path: 'email', validator: 'REQUIRED', field: 'Email'},
            {path: 'birthDate', validator: 'REQUIRED', type: 'date', field: 'BirthDate'}
        ];
        return mh.validate(validations, this);
    }

    clean() {
        const model: any = Object.assign({}, this);
        delete model.validate;
        return model;
    }
}
