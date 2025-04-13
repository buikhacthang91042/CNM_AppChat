const Friendship = require('../models/friendship');
const User = require('../models/user.model');
const Chat = require('../models/chat.model');
const { v4: uuidv4 } = require('uuid');

exports.sendFriendRequest = async (req, res) => {
  const senderId = req.user._id;
  const { receiverId } = req.body;

  try {
    // Kiểm tra xem đã tồn tại mối quan hệ chưa
    const existingRequest = await Friendship.findOne({
      $or: [
        { userId1: senderId, userId2: receiverId },
        { userId1: receiverId, userId2: senderId },
      ],
    });

    if (existingRequest) {
      return res.status(400).json({ message: 'Lời mời hoặc mối quan hệ đã tồn tại' });
    }

    const request = new Friendship({
      userId1: senderId,
      userId2: receiverId,
      status: 'pending',
    });
    await request.save();

    // Gửi thông báo realtime
    const io = req.app.get('io');
    const onlineUsers = req.app.get('onlineUsers');
    const receiverSocketId = onlineUsers.get(receiverId.toString());

    if (receiverSocketId) {
      io.to(receiverSocketId).emit('new_friend_request', {
        request: await request.populate('userId1', 'name avatar'),
      });
    }

    res.status(201).json({ message: 'Đã gửi lời mời kết bạn' });
  } catch (err) {
    console.error('Lỗi gửi lời mời:', err);
    res.status(500).json({ message: 'Lỗi server', error: err.message });
  }
};

exports.cancelFriendRequest = async (req, res) => {
  const senderId = req.user._id;
  const { receiverId } = req.body;

  try {
    const deleted = await Friendship.findOneAndDelete({
      userId1: senderId,
      userId2: receiverId,
      status: 'pending',
    });

    if (!deleted) {
      return res.status(404).json({ message: 'Không tìm thấy lời mời để hủy' });
    }

    res.status(200).json({ message: 'Đã hủy lời mời kết bạn' });
  } catch (error) {
    console.error('Lỗi hủy lời mời:', error.message);
    res.status(500).json({ message: 'Lỗi server' });
  }
};

exports.getFriendRequests = async (req, res) => {
  const userId = req.user._id;
  try {
    const requests = await Friendship.find({
      userId2: userId,
      status: 'pending',
    }).populate('userId1', 'name avatar phone');

    res.json({ requests });
  } catch (error) {
    console.error('Lỗi lấy lời mời:', error);
    res.status(500).json({ message: 'Lỗi server' });
  }
};

exports.acceptFriendRequest = async (req, res) => {
  const receiverId = req.user._id;
  const { senderId } = req.body;

  try {
    const request = await Friendship.findOne({
      userId1: senderId,
      userId2: receiverId,
      status: 'pending',
    });

    if (!request) {
      return res.status(404).json({ message: 'Không tìm thấy lời mời' });
    }

    request.status = 'accepted';
    request.updatedAt = Date.now();
    await request.save();

    // Tạo cuộc trò chuyện 1-1
    const chatId = uuidv4();
    const chat = new Chat({
      chatId,
      participants: [senderId, receiverId],
      isGroupChat: false,
    });
    await chat.save();

    // Gửi thông báo realtime
    const io = req.app.get('io');
    const onlineUsers = req.app.get('onlineUsers');
    const senderSocket = onlineUsers.get(senderId.toString());

    if (senderSocket) {
      io.to(senderSocket).emit('friend_request_accepted', {
        receiver: await User.findById(receiverId).select('name avatar'),
        chatId,
      });
    }

    res.json({ message: 'Đã chấp nhận lời mời', chatId });
  } catch (error) {
    console.error('Lỗi chấp nhận lời mời:', error);
    res.status(500).json({ message: 'Lỗi server' });
  }
};

exports.getFriends = async (req, res) => {
  const userId = req.user._id;
  try {
    const friendships = await Friendship.find({
      $or: [{ userId1: userId }, { userId2: userId }],
      status: 'accepted',
    });

    const friendIds = friendships.map((f) =>
      f.userId1.toString() === userId.toString() ? f.userId2 : f.userId1
    );

    const friends = await User.find({ _id: { $in: friendIds } }).select('name avatar phone');
    res.json(friends);
  } catch (error) {
    console.error('Lỗi lấy danh sách bạn bè:', error);
    res.status(500).json({ message: 'Lỗi server' });
  }
};

exports.getSentFriendRequests = async (req, res) => {
  const userId = req.user._id;
  try {
    const requests = await Friendship.find({
      userId1: userId,
      status: 'pending',
    }).populate('userId2', 'name avatar phone');

    res.json({ requests });
  } catch (error) {
    console.error('Lỗi lấy lời mời đã gửi:', error);
    res.status(500).json({ message: 'Lỗi server' });
  }
};

exports.canSendMessage = async (req, res) => {
  const senderId = req.user._id;
  const { receiverId } = req.body;

  try {
    const friendship = await Friendship.findOne({
      $or: [
        { userId1: senderId, userId2: receiverId, status: 'accepted' },
        { userId1: receiverId, userId2: senderId, status: 'accepted' },
      ],
    });

    if (!friendship) {
      return res.status(403).json({ message: 'Chỉ bạn bè mới có thể nhắn tin' });
    }

    const chat = await Chat.findOne({
      participants: { $all: [senderId, receiverId] },
      isGroupChat: false,
    });

    res.json({ canSend: true, chatId: chat ? chat.chatId : null });
  } catch (error) {
    console.error('Lỗi kiểm tra quyền nhắn tin:', error);
    res.status(500).json({ message: 'Lỗi server' });
  }
};