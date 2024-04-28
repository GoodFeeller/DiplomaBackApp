import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenService {
    constructor(private readonly jwtService: JwtService,
        private readonly config: ConfigService) {}

    async generateJwtToken(user) {
        const payload = {...user}
        return this.jwtService.sign(payload, {
            secret: this.config.get('token_secret'),
            expiresIn: this.config.get('expire_token')
        })
    }

    async decodeJwtToken(user) {
        return this.jwtService.decode(user)
    }
}
