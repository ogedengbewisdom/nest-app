import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ParseIntPipe implements PipeTransform {
  transform(value: string) {
    // return value;
    if (!value) return '';

    const val = parseInt(value, 10);

    if (isNaN(val)) throw new BadRequestException('Validation failed');

    return val;
  }
}
