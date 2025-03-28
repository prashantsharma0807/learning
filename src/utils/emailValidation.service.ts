import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class EmailValidationPipe implements PipeTransform {
    transform(value: any) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value.email)) {
            throw new BadRequestException('Invalid email format');
        }
        return value;
    }
}