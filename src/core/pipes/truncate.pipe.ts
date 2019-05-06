import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'truncate'
})
export class TruncatePipe implements PipeTransform {
    transform(value: string, limite: any, reverse = false): string {
        const limit = parseInt(limite);

        return reverse ?
            value.length > limit ? value.substring(limit, value.length) + '...' : value :
            value.length > limit ? value.substring(0, limit) + '...' : value;
    }
}
