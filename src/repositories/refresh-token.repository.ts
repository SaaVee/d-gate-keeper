import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {GateKeeperMongoDsDataSource} from '../datasources';
import {RefreshToken, RefreshTokenRelations} from '../models';

export class RefreshTokenRepository extends DefaultCrudRepository<
  RefreshToken,
  typeof RefreshToken.prototype.id,
  RefreshTokenRelations
> {
  constructor(
    @inject('datasources.gateKeeperMongoDS') dataSource: GateKeeperMongoDsDataSource,
  ) {
    super(RefreshToken, dataSource);
  }
}
