// src/partners/partners.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdatePartnerDto } from './dto/update-partner.dto';
import { Partner, PartnerDocument } from '../models/partner.schema';
import { CreatePartnerDto } from './dto/create.partner.dto';

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

    async findAll(): Promise<Partner[]> {
        // populate for location field
        return this.partnerModel.find().populate('location').exec();
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
