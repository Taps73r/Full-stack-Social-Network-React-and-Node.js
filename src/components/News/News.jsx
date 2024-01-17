import Post from '../Profile/Posts/Post/Post';
import './News.css';

function News (props) {
    let posts;
    if (props.newsData.posts && props.newsData.posts.length > 0) {
      posts = props.newsData.posts.map((post) => {
        return (
          <Post
            key={post._id}
            likes={post.likes}
            postId={post._id}
            userId={props.userId}
            likeCurrentPost={props.likeCurrentPost}
            message={post.postMessage}
            photos={post.photos}
            profileData={post.userId}
          />
        );
      });
    } else {
      posts = <p>No posts available.</p>;
    }
    return (
      <div className="news">
        <div className="news_element">
          <div className="news_content">{posts}</div>
        </div>
      </div>
    );
}

export default News;