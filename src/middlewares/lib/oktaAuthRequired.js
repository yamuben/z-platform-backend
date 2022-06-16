import { oktaJwtVerifier } from './oktaJwtVerifier';
import "dotenv/config";

export const oktaAuthRequired = (req ,res, next) => {
  const authHeader = req.headers.authorization || '';
  const match = authHeader.match(/Bearer (.+)/);

  if (!match) {
    res.status(401);
    return next('Unauthorized');
  }

  const accessToken = match[1];
  const audience = 'api://default';
  return (
    oktaJwtVerifier
      .verifyAccessToken(accessToken, audience)
      // eslint-disable-next-line promise/always-return
      .then((jwt) => {
        req.jwt = jwt;
        // eslint-disable-next-line promise/no-callback-in-promise
        next();
      })
      .catch((err) => {
        res.status(401).send(err.message);
      })
  );
};
