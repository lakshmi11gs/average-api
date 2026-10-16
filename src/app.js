const express = require("express");

const app = express();

app.use(express.json());

let numbers = [];

/**
 * Accepts a number and returns the average of all numbers
 * submitted to the API so far.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} JSON response containing the current average.
 */
app.post("/average", (req, res) => {
    const { number } = req.body;

    if (typeof number !== "number" || !Number.isFinite(number)) {
        return res.status(400).json({
            error: "number must be a valid number"
        });
    }

    numbers.push(number);

    const sum = numbers.reduce((total, value) => total + value, 0);
    const average = sum / numbers.length;

    res.json({
        average: average
    });
});

module.exports = app;

if (require.main === module) {
    const PORT = 3000;

    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
    });
}