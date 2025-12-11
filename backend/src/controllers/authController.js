const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/User');
const nodemailer = require('nodemailer');

const signAccess = user => jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '15m' });
const signRefresh = user => jwt.sign({ id: user._id }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });

exports.signup = async (req,res,next)=>{
  try{
    const { name,email,password } = req.body;
    const user = await User.create({ name,email,password });
    const access = signAccess(user);
    const refresh = signRefresh(user);
    user.refreshToken = refresh;
    await user.save();
    res.json({ user: { id: user._id, name: user.name, email: user.email }, access, refresh });
  }catch(err){next(err)}
};

exports.login = async (req,res,next)=>{
  try{
    const { email,password } = req.body;
    const user = await User.findOne({ email });
    if(!user) return res.status(401).json({ message: 'Invalid credentials' });
    const ok = await user.comparePassword(password);
    if(!ok) return res.status(401).json({ message: 'Invalid credentials' });
    const access = signAccess(user);
    const refresh = signRefresh(user);
    user.refreshToken = refresh;
    await user.save();
    res.json({ access, refresh, user: { id: user._id, email: user.email, name: user.name } });
  }catch(err){next(err)}
};

exports.refreshToken = async (req,res,next)=>{
  try{
    const { token } = req.body;
    if(!token) return res.status(400).end();
    const payload = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    const user = await User.findById(payload.id);
    if(!user || user.refreshToken !== token) return res.status(401).end();
    const access = signAccess(user);
    res.json({ access });
  }catch(err){next(err)}
};

exports.forgotPassword = async (req,res,next)=>{
  try{
    const { email } = req.body;
    const user = await User.findOne({ email });
    if(!user) return res.json({ ok: true });
    const token = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000;
    await user.save();
    // send email (ethereal or real)
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
    });
    await transporter.sendMail({ from: 'no-reply@example.com', to: user.email, subject: 'Reset', text: `Token: ${token}` });
    res.json({ ok: true });
  }catch(err){next(err)}
};

exports.resetPassword = async (req,res,next)=>{
  try{
    const { token, password } = req.body;
    const user = await User.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } });
    if(!user) return res.status(400).json({ message: 'Invalid token' });
    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();
    res.json({ ok: true });
  }catch(err){next(err)}
};
