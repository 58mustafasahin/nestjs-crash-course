import { CreateUserType } from '@app/utils/types';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private fakeUsers = [
    { username: 'john', email: 'john@john.com' },
    { username: 'cory', email: 'cory@cory.com' },
    { username: 'greg', email: 'greg@greg.com' },
  ];
  fetchUsers() {
    return this.fakeUsers;
  }
  createUser(userDetails: CreateUserType) {
    this.fakeUsers.push(userDetails);
    return;
  }

  fetchUserById(id: number) {
    return { id, username: 'john', email: 'john@john.com' };
  }
}
