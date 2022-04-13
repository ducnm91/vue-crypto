/* ============
 * Post Transformer
 * ============
 *
 * The transformer for the post.
 */

import Transformer from './Transformer';

export default class PostTransformer extends Transformer {
  /**
   * Method used to transform a fetched post.
   *
   * @param post The fetched post.
   *
   * @returns {Object} The transformed post.
   */
  static fetch(post) {
    return {
      postTitle: post.post_title,
      postThumbnail: post.post_thumbnail,
    };
  }

  /**
   * Method used to transform a send post.
   *
   * @param post The post to be send.
   *
   * @returns {Object} The transformed post.
   */
  static send(post) {
    return {
      post_title: post.postTitle,
      post_thumbnail: post.postThumbnail
    };
  }
}
