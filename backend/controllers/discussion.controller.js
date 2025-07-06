import { discuss } from "../models/discussion.model.js";

export const discussionPost = async (req, res) => {
   console.log("CSDASDAS")
  try {
    const { content, comment, email } = req.body;
    if(!content){
       return res.status(400).json({
         message:"content is missing ",
         success:false,
       })
    }
    const newDiscussion = await discuss.create({
      content,
      comment,
      email,
    });

    return res.status(201).json({ 
      message: "Discussion created successfully",
      success: true,
      data: newDiscussion,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error occurred",
      success: false,
    });
  }
};

// Function to delete discussion


export const createDiscussionPost = async (req, res) => {
  try {
    const { thought, user } = req.body;

    if (!thought || !user) {
      return res.status(400).json({ message: 'Thought and user are required' });
    }

    const newDiscussion = new discuss({
      content: thought,
      user, // Assuming user is being sent as an ObjectId
    });

    await newDiscussion.save();
    res.status(201).json({ success: true, discussion: newDiscussion });
  } catch (error) {
    console.error('Error creating discussion:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getallpost = async (req, res) => {
  try {
    const discussions = await discuss.find().populate('email', 'fullname profilePhoto');
    return res.status(200).json({
      success: true,
      discussions,
    });
  } catch (error) {
    console.error('Error fetching discussions:', error);
    return res.status(500).json({
      success: false,
      message: 'Error occurred while fetching discussions',
    });
  }
};
export const addComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { comment } = req.body;

    if (!comment) {
      return res.status(400).json({ message: 'Comment is required' });
    }

    const discussion = await discuss.findById(id);
    if (!discussion) {
      return res.status(404).json({ message: 'Discussion not found' });
    }

    discussion.comment.push(comment);
    await discussion.save();

    return res.status(200).json({ success: true, discussion });
  } catch (error) {
    console.error('Error adding comment:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Delete a discussion
export const discussionDelete = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const existingDiscussion = await discuss.findById(id);

    if (!existingDiscussion) {
      return res.status(404).json({ message: 'Discussion not found', success: false });
    }
    if (existingDiscussion.email.toString() !== userId) {
      return res.status(403).json({ message: 'You are not authorized to delete this discussion', success: false });
    }

    await discuss.findByIdAndDelete(id);

    return res.status(200).json({ message: 'Discussion deleted successfully', success: true });
  } catch (error) {
    console.error('Error deleting discussion:', error);
    return res.status(500).json({ message: 'Server error', success: false });
  }
};