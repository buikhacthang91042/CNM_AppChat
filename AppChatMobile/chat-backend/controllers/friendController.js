const FriendRequest = require("../models/FriendRequest");
const User = require("../models/User");

exports.sendFriendRequest = async (req, res) => {
  const senderId = req.user._id;
  const { receiverId } = req.body;

  try {
    const request = new FriendRequest({ sender: senderId, receiver: receiverId });
    await request.save();

    // Gửi realtime nếu người nhận đang online
    const io = req.app.get('io');
    const onlineUsers = req.app.get('onlineUsers');
    const receiverSocketId = onlineUsers.get(receiverId.toString());

    if (receiverSocketId) {
      io.to(receiverSocketId).emit('new_friend_request', {
        request: await request.populate('sender', 'name avatar'),
        
      });
      console.log("Emit đến", receiverSocketId);

    }

    res.status(201).json({ message: 'Đã gửi lời mời kết bạn' });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server' });
  }
};

exports.cancelFriendRequest = async (req, res) => {
  const senderId = req.user._id;
  const { receiverId } = req.body;

  try {
    const deleted = await FriendRequest.findOneAndDelete({
      sender: senderId,
      receiver: receiverId,
      status: "pending",
    });

    if (!deleted) {
      return res.status(404).json({ message: "Không tìm thấy lời mời để hủy" });
    }

    return res.status(200).json({ message: "Đã hủy lời mời kết bạn" });
  } catch (error) {
    console.error("Lỗi hủy lời mời:", error.message);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

exports.getFriendRequests = async (req, res) => {
  const userId = req.user._id;
  try {
    const requests = await FriendRequest.find({
      receiver: userId,
      status: "pending",
    }).populate("sender", "name avatar phone");
    res.json({ requests });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server" });
  }
};

exports.acceptFriendRequest = async (req, res) => {
  const receiverId = req.user._id;
  const { senderId } = req.body;

  try {
    const request = await FriendRequest.findOne({ sender: senderId, receiver: receiverId, status: 'pending' });
    if (!request) return res.status(404).json({ message: 'Không tìm thấy lời mời' });

    request.status = 'accepted';
    await request.save();

    await User.findByIdAndUpdate(receiverId, { $addToSet: { friends: senderId } });
    await User.findByIdAndUpdate(senderId, { $addToSet: { friends: receiverId } });

    const io = req.app.get('io');
    const onlineUsers = req.app.get('onlineUsers');
    const senderSocket = onlineUsers.get(senderId.toString());

    if (senderSocket) {
      io.to(senderSocket).emit('friend_request_accepted', {
        friend: await User.findById(receiverId).select('name avatar'),
      });
    }

    res.json({ message: 'Đã chấp nhận lời mời' });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server' });
  }
};

exports.getFriends = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate(
      "friends",
      "name avatar phone"
    );
    res.json(user.friends);
  } catch (err) {
    res.status(500).json({ message: "Lỗi server" });
  }
};
