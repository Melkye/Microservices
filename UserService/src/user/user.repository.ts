import User from './entities/user.entity';
import PrimaryRepository from '../utils/primary.repository';

export default class UserRepository extends PrimaryRepository<User>(User) {}
