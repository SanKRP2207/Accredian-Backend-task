const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { sendReferralEmail } = require('../services/emailService');

const createReferral = async (req, res) => {
  const { referrerName, referrerEmail, refereeName, refereeEmail, courseName } = req.body;

  if (!referrerName || !referrerEmail || !refereeName || !refereeEmail) {
    return res.status(400).json({ error: 'All fields except course name are required' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(referrerEmail) || !emailRegex.test(refereeEmail)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  try {
    const newReferral = await prisma.referral.create({
      data: {
        referrerName,
        referrerEmail,
        refereeName,
        refereeEmail, 
        courseName,
      },
    });

    sendReferralEmail(referrerEmail, refereeEmail, courseName);

    res.status(201).json(newReferral);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create referral' });
  }
};

module.exports = { createReferral };
