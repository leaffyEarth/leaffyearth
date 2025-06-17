// src/locations/locations.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Location, LocationDocument } from '../models/location.schema';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { QueryLocationsDto } from './dto/query-locations.dto';

@Injectable()
export class LocationsService {
  constructor(
    @InjectModel(Location.name)
    private readonly locationModel: Model<LocationDocument>,
  ) {}

  async create(createLocationDto: CreateLocationDto): Promise<Location> {
    const location = new this.locationModel(createLocationDto);
    return location.save();
  }

  async findAll(query: QueryLocationsDto): Promise<{ data: Location[]; page: number; limit: number; total: number }> {
    const page = parseInt(query.page ?? '1', 10) || 1;
    const limit = parseInt(query.limit ?? '10', 10) || 10;
    const skip = (page - 1) * limit;

    const queryBuilder = this.locationModel.find();

    if (query.search) {
      queryBuilder.where('name').regex(new RegExp(query.search, 'i'));
    }

    if (query.pincode) {
      queryBuilder.where('pincodes').in([query.pincode]);
    }

    if (query.pincodes && query.pincodes.length > 0) {
      queryBuilder.where('pincodes').in(query.pincodes);
    }

    const [data, total] = await Promise.all([
      queryBuilder.skip(skip).limit(limit).exec(),
      this.locationModel.countDocuments(queryBuilder).exec(),
    ]);

    return { data, page, limit, total };
  }

  async findOne(id: string): Promise<Location> {
    const location = await this.locationModel.findById(id).exec();
    if (!location) {
      throw new NotFoundException('Location not found');
    }
    return location;
  }

  async update(id: string, updateLocationDto: UpdateLocationDto): Promise<Location> {
    const location = await this.locationModel
      .findByIdAndUpdate(id, updateLocationDto, { new: true })
      .exec();
    if (!location) {
      throw new NotFoundException('Location not found');
    }
    return location;
  }

  async remove(id: string): Promise<Location> {
    const location = await this.locationModel.findByIdAndDelete(id).exec();
    if (!location) {
      throw new NotFoundException('Location not found');
    }
    return location;
  }
}
