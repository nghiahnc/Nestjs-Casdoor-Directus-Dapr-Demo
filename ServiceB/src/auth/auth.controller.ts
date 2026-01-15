import { Controller, Get, Req, Res } from '@nestjs/common';
import type { Request, Response } from 'express';
import { CasdoorService } from './casdoor.service';

@Controller('auth')
export class AuthController {
  constructor(private casdoor: CasdoorService) {}

  @Get('login')
  login(@Req() req: Request, @Res() res: Response) {
 
    return res.redirect(this.casdoor.getLoginUrl());
  }

  @Get('callback')
  async callback(@Req() req: Request, @Res() res: Response) {
    const { code } = req.query;
    if (!code) return res.status(400).send('Missing code');

    const token = await this.casdoor.handleCallback(code as string);

    req.session.user = {
      accessToken: token.access_token,
    };

    const redirectUrl = req.session.returnTo || '/';
    delete req.session.returnTo;

    return res.redirect(redirectUrl);
  }
}
