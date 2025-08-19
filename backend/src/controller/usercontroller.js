import History from "../models/Historymodel.js";
import User from "../models/Usermodel.js";

export const addUser=  async (req, res) => {
    try {
          const { name } = req.body;
  const user = new User({ name });
  await user.save();
  res.json(user);

    } catch (error) {
          console.log(error);
    res.status(500).json({message:"something went wrong"});
    }

}

export const getLeaderBoard = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const users = await User.find()
      .sort({ totalPoints: -1 })
      .skip(skip)
      .limit(limit);
    
    const totalUsers = await User.countDocuments();
    const totalPages = Math.ceil(totalUsers / limit);

    res.json({
      users,
      pagination: {
        currentPage: page,
        totalPages,
        totalUsers,
        hasNext: page < totalPages,
        hasPrev: page > 1
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
}
export const Claimpoint= async (req, res) => {
try {
      const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });

  const points = Math.floor(Math.random() * 10) + 1;
  user.totalPoints += points;
  await user.save();

  const history = new History({ userId: user._id, points });
  await history.save();

  return res.json({ user, points });
} catch (error) {
    console.log(error);
    res.status(500).json({message:"something went wrong"});
}


}
export const getUserHistory=    async (req, res) => {
    try {  const history = await History.find({ userId: req.params.id }).sort({ createdAt: -1 });
  res.json(history);
        
    } catch (error) {
           console.log(error);
    res.status(500).json({message:"something went wrong"});
    }


}