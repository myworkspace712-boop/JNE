import User from '../Models/user.js';
import Quote from '../Models/quote.js';


export const getDashboardData = async (req, res) => {
    try {
        // Fetch all required data in parallel for efficiency
        const [totalUsers, verifiedUsers, unverifiedUsers, recentSignups, allUsers, totalOrders, recentOrders] = await Promise.all([
            User.countDocuments(),
            User.countDocuments({ isVerified: true }),
            User.countDocuments({ isVerified: false }),
            User.find()
                .sort({ createdAt: -1 })
                .limit(5)
                .select('name email role isVerified createdAt'),
            User.find()
                .select('-password -verificationToken'),
            Quote.countDocuments(),
            Quote.find()
                .sort({ createdAt: -1 })
                .limit(10)
        ]);

        return res.status(200).json({
            success: true,
            data: {
                totalUsers,
                verifiedUsers,
                unverifiedUsers,
                recentSignups,
                allUsers,
                totalOrders,
                recentOrders
            }
        });
    } catch (error) {
        console.error('Error fetching dashboard data:', error);
        return res.status(500).json({ success: false, error: 'Server error fetching dashboard data.' });
    }
};

// @desc    Delete a user by ID
// @route   DELETE /api/admin/users/:id
// @access  Private/Admin
export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        // Safety Check: Prevent admin from deleting their own account
        if (req.user && req.user._id.toString() === id.toString()) {
            return res.status(400).json({
                success: false,
                error: 'Action forbidden: You cannot delete your own admin account.'
            });
        }

        const user = await User.findByIdAndDelete(id);

        if (!user) {
            return res.status(404).json({
                success: false,
                error: 'User not found.'
            });
        }

        return res.status(200).json({
            success: true,
            message: `User '${user.name}' (${user.email}) deleted successfully.`,
            deletedUserId: id
        });
    } catch (error) {
        console.error('Error deleting user:', error);
        return res.status(500).json({
            success: false,
            error: error.message || 'Server error while deleting user.'
        });
    }
};