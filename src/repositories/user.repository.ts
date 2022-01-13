import {Getter, inject} from '@loopback/core';
import {
  BelongsToAccessor, DefaultCrudRepository,
  HasOneRepositoryFactory,
  juggler,
  repository
} from '@loopback/repository';
import {RolesRepository} from '.';
import {UserServiceBindings} from '../keys';
import {Role, User, UserCredentials, UserRelations} from '../models';
import {UserCredentialsRepository} from './user-credentials.repository';

export class UserRepository extends DefaultCrudRepository<User, typeof User.prototype.id, UserRelations> {
  public readonly userCredentials: HasOneRepositoryFactory<UserCredentials, typeof User.prototype.id>;

  public readonly roles: BelongsToAccessor<Role, typeof User.prototype.id>;

  constructor(
    @inject(`datasources.${UserServiceBindings.DATASOURCE_NAME}`)
    dataSource: juggler.DataSource,
    @repository.getter('UserCredentialsRepository')
    protected userCredentialsRepositoryGetter: Getter<UserCredentialsRepository>,
    @repository.getter('RolesRepository') protected roleRepositoryGetter: Getter<RolesRepository>,
  ) {
    super(User, dataSource);
    this.roles = this.createBelongsToAccessorFor('roles', roleRepositoryGetter);
    this.registerInclusionResolver('roles', this.roles.inclusionResolver);
    this.userCredentials = this.createHasOneRepositoryFactoryFor('userCredentials', userCredentialsRepositoryGetter);
    this.registerInclusionResolver('userCredentials', this.userCredentials.inclusionResolver);
  }

  async findCredentials(userId: typeof User.prototype.id): Promise<UserCredentials | undefined> {
    try {
      return await this.userCredentials(userId).get();
    } catch (err) {
      if (err.code === 'ENTITY_NOT_FOUND') {
        return undefined;
      }
      throw err;
    }
  }
}
