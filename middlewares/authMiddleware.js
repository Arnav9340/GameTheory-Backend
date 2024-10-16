import jwt from 'jsonwebtoken';
import user from '../models/user.js';

const authMiddleware = (req, res, next) => {
	const token = req.header("Authorization")?.replace("Bearer ", "");
	console.log(token);
	if (!token) {
		return res.status(401).json({ message: "No token, authorization denied" });
	}
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		req.user = decoded;
		console.log(req.user);
		next();
	} catch (err) {
		res.status(401).json({ message: "Token is not valid" });
	}
};

const operationsMiddleware = (req, res, next) => {
	if (req.user.role === "customer") {
		return res
			.status(403)
			.json({ message: "Access restricted to operations team only" });
	}
	next();
};

const adminMiddleware = (req, res, next) => {
	if (req.user.role !== "admin") {
		return res
			.status(403)
			.json({ message: "Access restricted to admins only" });
	}
	next();
};

export { authMiddleware, operationsMiddleware, adminMiddleware };