import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SignModule } from './sign/sign.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config from './configurations/index'
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './sign/models/user.model';
import { TokenModule } from './token/token.module';
import { PhoneInfoModule } from './phone-info/phone-info.module';
import { WorkModule } from './work/work.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter'
import { FilesModule } from './files/files.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { MessagesModule } from './messages/messages.module';

@Module({
  imports: [SignModule,
     ConfigModule.forRoot({
    isGlobal: true,
    load: [config]
  }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        dialect: 'postgres',
        host: configService.get('db_host'),
        port: configService.get('db_port'),
        username: configService.get('db_user'),
        password: configService.get('db_password'),
        synchronize: true,
        autoLoadModels: true,
        models: [User]
      })
    }),
    TokenModule,
    PhoneInfoModule,
    WorkModule,
    MailerModule.forRoot({
      transport: {
        host: 'mailbe01.hoster.by',
        port: 465 ,
        secure: true,
        auth: {
          user: 'vital.link@goodfeeller-test.by',
          pass: 'GoodFeeller2004'
        }
      },
      defaults: {
        from: "VitalLink <vital.link@goodfeeller-test.by>"
      },
      template: {
        adapter: new EjsAdapter()
      }
    }),
    MailerModule,
    FilesModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '/static'),
    }),
    MessagesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {

}
