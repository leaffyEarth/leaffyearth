// src/partners/partners.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdatePartnerDto } from './dto/update-partner.dto';
import { Partner, PartnerDocument } from '../models/partner.schema';
import { CreatePartnerDto } from './dto/create.partner.dto';
import { QueryPartnersDto } from './dto/query-partners.dto';
@Injectable()
export class PartnersService {
    constructor(
        @InjectModel(Partner.name)
        private readonly partnerModel: Model<PartnerDocument>,
    ) { }

    async create(dto: CreatePartnerDto): Promise<PartnerDocument> {
        const partner = new this.partnerModel(dto);
        return partner.save();
    }

    async findAll(query: QueryPartnersDto): Promise<{ data: Partner[]; page: number; limit: number; total: number }> {
        // populate for location field
        const page = parseInt(query.page ?? '1', 10) || 1;
        const limit = parseInt(query.limit ?? '10', 10) || 10;
        const skip = (page - 1) * limit;

        const queryBuilder = this.partnerModel.find().populate('location');

        if (query.location) {
            queryBuilder.where('location', query.location);
        }

        if (query.isActive) {
            queryBuilder.where('isActive', query.isActive);
        }

        if (query.contactPerson) {
            queryBuilder.where('contactPerson', query.contactPerson);
        }  
        
        const [data, total] = await Promise.all([
            queryBuilder.skip(skip).limit(limit).exec(),
            this.partnerModel.countDocuments(queryBuilder).exec(),
        ]);

        return { data, page, limit, total };
    }

    async findOne(id: string): Promise<Partner> {
        const partner = await this.partnerModel
            .findById(id)
            .populate('location')
            .exec();
        if (!partner) {
            throw new NotFoundException('Partner not found');
        }
        return partner;
    }

    async update(id: string, updateDto: UpdatePartnerDto): Promise<Partner> {
        const partner = await this.partnerModel
            .findByIdAndUpdate(id, updateDto, { new: true })
            .populate('location')
            .exec();
        if (!partner) {
            throw new NotFoundException('Partner not found');
        }
        return partner;
    }

    async remove(id: string): Promise<Partner> {
        const partner = await this.partnerModel.findByIdAndDelete(id).exec();
        if (!partner) {
            throw new NotFoundException('Partner not found');
        }
        return partner;
    }
}
