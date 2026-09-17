const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware สำหรับแปลงข้อมูล Body ให้เป็น JSON
app.use(express.json());

// 1. เชื่อมต่อเข้ากับ MongoDB ผ่าน Mongoose (เอาออปชันที่ไม่รองรับออกแล้ว)
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('✅ เชื่อมต่อ MongoDB สำเร็จเรียบร้อย!'))
.catch((err) => console.error('❌ เกิดข้อผิดพลาดในการเชื่อมต่อ MongoDB:', err));

// 2. สร้าง Schema และ Model สำหรับเก็บข้อมูล (ตัวอย่าง: เก็บข้อมูลผู้ใช้)
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

// 3. สร้าง API Endpoint สำหรับทดสอบบันทึกข้อมูล (POST)
app.post('/api/users', async (req, res) => {
    try {
        const { name, email } = req.body;
        const newUser = new User({ name, email });
        await newUser.save();
        res.status(201).json({ message: 'บันทึกข้อมูลสำเร็จ!', data: newUser });
    } catch (error) {
        res.status(500).json({ message: 'เกิดข้อผิดพลาด', error: error.message });
    }
});

// 4. สร้าง API Endpoint สำหรับดึงข้อมูลทั้งหมด (GET)
app.get('/api/users', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'เกิดข้อผิดพลาด', error: error.message });
    }
});

// เปิดใช้งาน Server
app.listen(PORT, () => {
    console.log(`🚀 Server กำลังรันอยู่ที่ http://localhost:${PORT}`);
});