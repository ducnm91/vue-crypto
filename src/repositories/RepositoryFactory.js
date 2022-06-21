import PostRepository from './PostRepository';
import AuthRepository from './AuthRepository';
import BinanceRepository from './BinanceRepository';
import CoingeckoRepository from './CoingeckoRepository';
import WhaleAlertRepository from './WhaleAlertRepository';
import AlternativeRepository from './AlternativeRepository';
import CoinmarketRepository from './CoinmarketRepository';

const repositories = {
    posts: PostRepository,
    auth: AuthRepository,
    binance: BinanceRepository,
    coingecko: CoingeckoRepository,
    whale_alert: WhaleAlertRepository,
    alternative: AlternativeRepository,
    coinmarket: CoinmarketRepository
}

export default {
    get: name => repositories[name]
};