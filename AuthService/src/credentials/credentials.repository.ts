import Credentials from './entities/credentials.entity';
import PrimaryRepository from '../utils/primary.repository';

export default class CredentialsRepository extends PrimaryRepository<Credentials>(
  Credentials,
) {}
