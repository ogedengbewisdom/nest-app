import { JwtAuthGuard } from './jwt-auth.guard';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

describe('JwtAuthGuard', () => {
  let reflector: Reflector;
  let jwtService: JwtService;
  beforeEach(() => {
    reflector = new Reflector();
    jwtService = new JwtService();
  });
  it('should be defined', () => {
    expect(new JwtAuthGuard(reflector, jwtService)).toBeDefined();
  });
});
