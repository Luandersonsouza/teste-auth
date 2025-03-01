import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  private users = [
    { id: 1, username: 'admin', password: bcrypt.hashSync('senha123', 10) },
  ];

  async findOne(username: string) {
    return this.users.find(user => user.username === username);
  }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.findOne(username);
    if (user && bcrypt.compareSync(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
