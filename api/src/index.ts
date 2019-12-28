import mongoose from 'mongoose';
import session from 'express-session';
import connectRedis from 'connect-redis';
import Redis from 'ioredis';
import {REDIS_OPTIONS, APP_PORT, MONGO_URI, MONGO_OPTIONS} from './config';
import {createApp} from "./app";

(async () => {
  mongoose.connect(MONGO_URI, MONGO_OPTIONS)
    .then(() => {
    const RedisStore = connectRedis(session);
  
    const client = new Redis(REDIS_OPTIONS);
    const store = new RedisStore({ client });
    const app = createApp(store);
    
    app.listen(APP_PORT, () => console.log(`http://localhost:${APP_PORT}`));
  })
    .catch(console.log);
  
  // await mongoose.connect(MONGO_URI, MONGO_OPTIONS);
  
  /*const RedisStore = connectRedis(session);
  
  const client = new Redis(REDIS_OPTIONS);
  
  const app = express();
  
  app.use(
    session({
      ...SESSION_OPTIONS,
      store: new RedisStore({ client }),
    })
  );
  
  app.get('/', (req, res) => res.json({ message: 'Works!!!' }));
  
  app.listen(APP_PORT, () => console.log(`http://localhost:${APP_PORT}`));*/
})();
