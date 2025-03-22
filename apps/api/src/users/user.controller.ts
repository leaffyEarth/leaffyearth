// src/users/users.controller.ts
import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Patch,
    Delete,
    Req,
    Query
} from '@nestjs/common';
import { UsersService } from './user.service';
import { Request } from 'express';
import { Roles } from '../auth/roles.decorator';
import { QueryUsersDto } from './dto/quary-users.dto';
import { RequestWithUser } from '../common/types.interface';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
// @UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post()
    @ApiOperation({ summary: 'Creates a new user' })
    // @Roles('owner')
    async createUser(@Body() userData: any, @Req() req: RequestWithUser) {
        const currentUser = { role: 'owner' };
        return this.usersService.createUser(userData, currentUser.role);
    }

    @Get()
    @ApiOperation({ summary: 'Retrieves all users based on the provided query parameters', })
    @Roles('owner', 'admin', 'manager')
    async findAll(@Query() query: QueryUsersDto) {
        return this.usersService.findAll(query);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Retrieves a specific user by its ID.' })
    @Roles('owner', 'admin', 'manager')
    async findOne(@Param('id') id: string) {
        return this.usersService.findOneById(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Updates a specific user by its ID using the provided update data.' })
    @Roles('owner', 'admin')
    async updateUser(@Param('id') id: string, @Body() updateData: any, @Req() req: Request) {
        const currentUser = req.user as any;
        return this.usersService.updateUser(id, updateData, currentUser);
    }

    @Delete(':id')
    @ApiOperation({
        summary: 'Deletes a specific user by its ID.',
    })
    @Roles('owner', 'admin')
    async removeUser(@Param('id') id: string, @Req() req: Request) {
        const currentUser = req.user as any;
        return this.usersService.deleteUser(id, currentUser.role);
    }
}
