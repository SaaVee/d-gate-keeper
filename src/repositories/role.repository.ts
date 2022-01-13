import {inject} from '@loopback/core';
import {DefaultCrudRepository, juggler} from '@loopback/repository';
import {UserServiceBindings} from '../keys';
import {Role, RoleRelations} from '../models';

export class RolesRepository extends DefaultCrudRepository<Role, typeof Role.prototype.id, RoleRelations> {
  constructor(
    @inject(`datasources.${UserServiceBindings.DATASOURCE_NAME}`)
    dataSource: juggler.DataSource,
  ) {
    super(Role, dataSource);
  }
}
