import User from '../Models/user.js';


export const getDashboardData = async (req, res) => {
    try {
        // Fetch all required data in parallel for efficiency
        const [totalUsers, verifiedUsers, unverifiedUsers, recentSignups, allUsers] = await Promise.all([
            User.countDocuments(),
            User.countDocuments({ isVerified: true }),
            User.countDocuments({ isVerified: false }),
            User.find()
                .sort({ createdAt: -1 })
                .limit(5)
                .select('name email role isVerified createdAt'),
            User.find()
                .select('-password -verificationToken')
        ]);

        return res.status(200).json({
            success: true,
            data: {
                totalUsers,
                verifiedUsers,
                unverifiedUsers,
                recentSignups,
                allUsers
            }
        });
    } catch (error) {
        console.error('Error fetching dashboard data:', error);
        return res.status(500).json({ success: false, error: 'Server error fetching dashboard data.' });
    }
};