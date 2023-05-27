import Post from '../model/Post.js';
import User from '../model/User.js';

/*  CREATE  */
export const getFeedPosts = async(req, res) => {
    try {
        const post = await Post.find();
        res.status(200).json(post);

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

/*  READ  */
export const createPost = async(req, res) => {
    try {
        const { userId, description, picturePath } = req.body;
        const user = await User.findById(userId);
        const newPost = new Post({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            description,
            picturePath,
            userPicturePath: user.picturePath,
            picturePath,
            likes: {},
            comments: []
        })

        await newPost.save();

        const post = await Post.find();
        res.status(201).json(post);

    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}