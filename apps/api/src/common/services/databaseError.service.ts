import { BadRequestException, ConflictException, InternalServerErrorException } from "@nestjs/common";


export function handleMongooseError(error: any): never {
    // Duplicate key
    if (error.code === 11000) {
        const field = Object.keys(error.keyPattern || {})[0];
        throw new ConflictException(`Duplicate value for field: ${field}`);
    }

    // Mongoose Validation Error
    if (error.name === 'ValidationError') {
        const messages = Object.values(error.errors).map((err: any) => err.message);
        throw new BadRequestException(messages.join(', '));
    }

    // Generic fallback
    throw new InternalServerErrorException(error.message || 'Database error');
}