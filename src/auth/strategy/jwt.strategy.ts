import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

Injectable();
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: process.env.KEY,
    });
  }
  async validate(payload: any) {
    console.log(payload);
    return {
      username: payload.username,
      userId: payload.sub,
      isSuper: payload.isSuper,
    };
  }
}
