import * as Fuse from 'fuse.js';

const badRequest = (callback, errors) => {
    console.error(errors);
    return callback(null, {
        statusCode: 400,
        headers: {'Content-Type': 'text/plain'},
        body: typeof errors === 'object' ? JSON.stringify(errors) : typeof errors === 'string' ? errors : 'Bad Request',
    });
};

const error = (callback, errors, code) => {
    console.error(errors);
    const errorMSG = errors && typeof errors === 'object' ?
        errors.message || JSON.stringify(errors) :
        typeof errors === 'string' ? errors : 'Unknown';

    return callback(null, {
        statusCode: errors && errors.statusCode || code || 500,
        headers: {'Content-Type': 'text/plain'},
        body: errorMSG
    });
};

const send = (callback, data) => callback(null, {
    statusCode: 200,
    body: JSON.stringify(data),
});

const parseDate = value => {
    const comesAsDate = value && typeof value === 'function' && value instanceof Date;
    const comesAsTimeStamp = value && (new Date(value)) instanceof Date;

    if (comesAsDate || comesAsTimeStamp) {
        // TODO check range validation
        const date = comesAsDate ? value : new Date(value);
        return {valid: true, value: date.toISOString()};
    } else {
        return {valid: false};
    }
};
const cleanNestedObject = (object) => {
    Object
        .entries(object)
        .forEach(([k, v]) => {
            if (v && typeof v === 'object') {
                cleanNestedObject(v);
            }
            if (v && typeof v === 'object' && !Object.keys(v).length || v === null || v === undefined) {
                if (Array.isArray(object)) {
                    object.splice(parseInt(k), 1);
                } else {
                    delete object[k];
                }
            }
        });
    return object;
};
const findItemInMemory = (array, key = 'title', text = '', minimum = 1) => {
    return new Promise((resolve, reject) => {
        if (text && text.length >= minimum) {
            const options = {
                shouldSort: true,
                tokenize: true,
                matchAllTokens: true,
                keys: [{
                    name: key
                }]
            };
            // @ts-ignore
            const fuse = new Fuse(array, options);
            resolve(fuse.search(text));
        } else {
            resolve(array);
        }
    });
};
const paginator = (array, text, order, limit = 10) => {
    return new Promise((resolve, reject) => {
        findItemInMemory(array, 'title', text)
            .then((resultFiltered: any) => {
                const resultSorted = sort[order ? 'down' : 'up'](resultFiltered, 'publishedAt', true);
                const count = resultSorted && resultSorted.length;
                if (count) {
                    const pagesCount = parseInt((count / limit).toString()) + (count % limit === 0 ? 0 : 1);
                    const mapPages = (v, i) => resultSorted.slice(i * limit, (limit * (1 + i)) > count ? count : (limit * (1 + i)));
                    const finalResultInPages = Array.from(new Array(pagesCount), mapPages);
                    resolve({pages: finalResultInPages, count, limit, pagesCount});
                } else {
                    resolve({pages: [], count: 0, limit, pagesCount: 0});
                }
            })
            .catch(reject);
    });
};
const sort = {
    down: (arr, key, dates = false) => {
        if (dates) {
            return arr && arr.sort((a, b) => new Date(b[key]).getTime() - new Date(a[key]).getTime());
        } else {
            return arr && arr.sort((a, b) => b[key] - a[key]);
        }
    },
    up: (arr, key, dates = false) => {
        if (dates) {
            return arr && arr.sort((a, b) => new Date(a[key]).getTime() - new Date(b[key]).getTime());
        } else {
            return arr && arr.sort((a, b) => a[key] - b[key]);
        }
    }
};
export default {
    badRequest,
    error,
    send,
    parseDate,
    cleanNestedObject,
    findItemInMemory,
    paginator
};
