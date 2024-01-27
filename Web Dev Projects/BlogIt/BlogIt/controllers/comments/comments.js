const commentCtrl = async (req, res) => {
    try {
      res.json({
        status: "success",
        user: "comment created",
      });
    } catch (error) {
      res.json(error);
    }
  }

const commentPostCtrl =  async (req, res) => {
    try {
      res.json({
        status: "success",
        user: "Post comments",
      });
    } catch (error) {
      res.json(error);
    }
  }

const commentDeleteCtrl =  async (req, res) => {
    try {
      res.json({
        status: "success",
        user: "comment deleted",
      });
    } catch (error) {
      res.json(error);
    }
  }

const commentUpdateCtrl =  async (req, res) => {
    try {
      res.json({
        status: "success",
        user: "comment updated",
      });
    } catch (error) {
      res.json(error);
    }
  }

  module.exports ={
    commentCtrl, commentPostCtrl, commentDeleteCtrl, commentUpdateCtrl
};