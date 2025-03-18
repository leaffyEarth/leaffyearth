// src/locations/locations.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { Location, LocationDocument } from '../models/location.schema';

@Injectable()
export class LocationsService {
    
  constructor(
    @InjectModel(Location.name)
    private readonly locationModel: Model<LocationDocument>,
  ) {}

  async create(dto: CreateLocationDto): Promise<Location> {
    const location = new this.locationModel(dto);
    return location.save();
  }

  async findAll(): Promise<Location[]> {
    return this.locationModel.find().exec();
  }

  async findOne(id: string): Promise<Location> {
    const location = await this.locationModel.findById(id).exec();
    if (!location) {
      throw new NotFoundException('Location not found');
    }
    return location;
  }

  async update(id: string, updateDto: UpdateLocationDto): Promise<Location> {
    const location = await this.locationModel.findByIdAndUpdate(id, updateDto, {
      new: true,
    });
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
