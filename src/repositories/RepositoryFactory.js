import PostRepository from './PostRepository';
import AuthRepository from './AuthRepository';
import BinanceRepository from './BinanceRepository';
import CoingeckoRepository from './CoingeckoRepository';
import WhaleAlertRepository from './WhaleAlertRepository';

const repositories = {
    posts: PostRepository,
    auth: AuthRepository,
    binance: BinanceRepository,
    coingecko: CoingeckoRepository,
    whale_alert: WhaleAlertRepository
}

export default {
    get: name => repositories[name]
};