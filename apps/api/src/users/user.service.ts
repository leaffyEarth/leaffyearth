// src/users/users.service.ts
import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../models/user.schema';
import { QueryUsersDto } from './dto/query-users.dto';
import { handleMongooseError } from '../common/services/databaseError.service';
import { UserPayload } from '../common/types.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    
  ) { }

  async createUser(userData: Partial<User>, currentUserRole: string): Promise<User> {
    const { email, role, name, uid, dob, gender } = userData;

    if ((role === 'admin' || role === 'owner') && currentUserRole !== 'owner') {
      throw new ForbiddenException('Only an owner can create admin/owner');
    }

    const finalRole = role || 'manager';

    try {
      const newUser = new this.userModel({
        email,
        name,
        uid,
        dob,
        gender,
        role: finalRole,
      });
      await newUser.save();

      return newUser
    } catch (error) {
      handleMongooseError(error);
    }
  }

  async findAll(query: QueryUsersDto): Promise<{ data: User[]; page: number; limit: number; total: number }> {
    const page = parseInt(query.page ?? '1', 10) || 1;
    const limit = parseInt(query.limit ?? '10', 10) || 10;
    const skip = (page - 1) * limit;

    let fields = '';
    if (query.fields) {
      fields = query.fields.replace(/,/g, ' ');
    }

    const [data, total] = await Promise.all([
      this.userModel.find().select(fields).skip(skip).limit(limit).exec(),
      this.userModel.countDocuments().exec(),
    ]);

    return {
      data,
      page,
      limit,
      total,
    };

  }

  async findOneById(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec();
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async findOneByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email }).exec();
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async updateUser(id: string, updateData: Partial<User>, currentUser: UserPayload): Promise<User> {
    // If updating the role to admin/owner, ensure the current user is an owner
    if ((updateData.role === 'admin' || updateData.role === 'owner') && currentUser.role !== 'owner') {
      throw new ForbiddenException('Only an owner can promote user to admin/owner');
    }

    const user = await this.userModel.findByIdAndUpdate(id, updateData, { new: true });

    if (currentUser.email === user?.email) {
      throw new ForbiddenException('cannot change own role');
    }

    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  // Only owners or admins can delete (example); managers can't delete
  async deleteUser(id: string, currentUserRole: string): Promise<User> {
    if (currentUserRole === 'manager') {
      throw new ForbiddenException('Managers cannot delete users');
    }
    const user = await this.userModel.findByIdAndDelete(id);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }
}
