import Quote from '../Models/quote.js';


// @desc    Create a new quote request
// @route   POST /api/quotes
export const submitQuote = async (req, res) => {
    try {
        const { name, email, product, quantity } = req.body;

        if (!name || !email || !product || !quantity) {
            return res.status(400).json({ error: 'Please provide all required fields.' });
        }

        // Save to MongoDB
        const newQuote = await Quote.create({
            name,
            email,
            product,
            quantity,
        });

        return res.status(201).json({
            success: true,
            message: `Thank you, ${name}. Your quote for ${quantity}x ${product} has been successfully logged!`,
            data: newQuote
        });

    } catch (error) {
        console.error('Quote submission error:', error);
        return res.status(500).json({ error: 'Server error while processing your quote.' });
    }
};

// @desc    Get all quotes
// @route   GET /api/quotes/all-quotes (or similar)
export const getAllQuotes = async (req, res) => {
    try {
        const quotes = await Quote.find().sort({ createdAt: -1 });
        return res.status(200).json(quotes);
    } catch (error) {
        console.error('Error fetching quotes:', error);
        return res.status(500).json({ error: 'Server error while fetching quotes.' });
    }
};

// @desc    Update quote status
// @route   PATCH /api/quotes/update-quote/:id
export const updateQuoteStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const updatedQuote = await Quote.findByIdAndUpdate(
            id,
            { status },
            { new: true, runValidators: true }
        );

        if (!updatedQuote) {
            return res.status(404).json({ error: 'Quote not found.' });
        }

        return res.status(200).json({
            success: true,
            message: 'Quote status updated successfully.',
            data: updatedQuote
        });
    } catch (error) {
        console.error('Error updating quote status:', error);
        return res.status(500).json({ error: 'Server error while updating quote status.' });
    }
};