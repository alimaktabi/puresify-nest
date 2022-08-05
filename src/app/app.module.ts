import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AccountsModule } from 'src/modules/accounts/accounts.module'
import { BlogsModule } from 'src/modules/blogs/blogs.module'
import { CategoriesModule } from 'src/modules/categories/categories.module'
import { UploadsModule } from 'src/modules/uploads/uploads.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('DB_HOST'),
        port: config.get('DB_PORT'),
        username: config.get('DB_USER'),
        password: config.get('DB_PASSWORD'),
        database: config.get('DB_NAME'),
        autoLoadEntities: true,
        synchronize:
          config.get('NODE_ENV') !== 'production',
      }),
    }),
    AccountsModule,
    UploadsModule,
    BlogsModule,
    CategoriesModule,
  ],
})
export class AppModule {}
