import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable } from '@nestjs/common';
import 'dotenv/config';
import { ReqResUser } from '../models/interfaces/ReqResUser';

@Injectable()
export class ReqResUsersService {
  private readonly baseUrl: string = process.env.REQRES_BASE_URL;
  constructor(private readonly httpService: HttpService) {}

  async getById(id: string): Promise<ReqResUser> {
    try {
      const result = await this.httpService.axiosRef.get(
        `${this.baseUrl}/${Number(id)}`,
      );

      return result.data.data;
    } catch ({ response }) {
      throw new BadRequestException(response.statusText, response.status);
    }
  }
}
