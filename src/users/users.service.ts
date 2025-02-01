import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';
import { UserDTO } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async getUserByEmail(email: string) {
    return await this.userModel.findOne({ email });
  }

  async create(data: UserDTO, tenantId: string) {
    data.password = await bcrypt.hash(data.password, 10);
    const user = await this.userModel.create({ ...data, tenantId });

    user.save();

    return user;
  }
}
