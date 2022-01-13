import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'gateKeeperMongoDS',
  connector: 'mongodb',
  url: 'mongodb+srv://selva:gkN5fM75H3QvJrs@ci-cd-test-app-db.evztz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  host: '',
  port: 0,
  user: '',
  password: '',
  database: '',
  useNewUrlParser: true
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class GateKeeperMongoDsDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'gateKeeperMongoDS';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.gateKeeperMongoDS', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
