import { environment } from '../../environments/environment';
import { delay, retryWhen, take } from 'rxjs/operators';
import { HttpClient, HttpXhrBackend } from '@angular/common/http';

const http = new HttpClient(new HttpXhrBackend({build: () => new XMLHttpRequest()}));
const BE_BASE = environment.server.backEnd.base;


const getBE = (path, params?) => {
    return http.get(BE_BASE + path, {params});
};

const postBE = (path, params?) => {
    return http.post(BE_BASE + path, params);
        // .pipe(retryWhen((errors: any) => errors.pipe(delay(1000), take(10))));
};
const deleteBE = (path, params?) => {
    return http.delete(BE_BASE + path, {params});
        // .pipe(retryWhen((errors: any) => errors.pipe(delay(1000), take(10))));
};
const putBE = (path, params?) => {
    return http.put(BE_BASE + path, params);
        // .pipe(retryWhen((errors: any) => errors.pipe(delay(1000), take(10))));
};

export default {
    getBE,
    postBE,
    putBE,
    deleteBE
};
