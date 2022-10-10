import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';

@Injectable()
export class SearchCasePipe implements PipeTransform<any, any> {
    transform(value: any, metadata: ArgumentMetadata): any {
        if (value?.name) {
            value.name = '%' + value.name.replace(/[^a-zA-Z0-9]/g, '%').toUpperCase() + '%';
        }

        return value;
    }
}
