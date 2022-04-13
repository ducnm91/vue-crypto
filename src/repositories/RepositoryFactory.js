import PostRepository from './PostRepository';
import AuthRepository from './AuthRepository';

const repositories = {
    'posts': PostRepository,
    'auth': AuthRepository
}

export default {
    get: name => repositories[name]
};