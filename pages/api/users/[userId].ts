import type { NextApiRequest, NextApiResponse } from "next";
import type { UpdateResult, DeleteResult } from "mongodb";
import { ObjectId } from "mongodb";
import clientPromise from "utils/mongodb";
import { User } from "models";

export default async (req: NextApiRequest, res: NextApiResponse<User | UpdateResult | DeleteResult>) => {
	const { method } = req;
	const userId = req.query.userId as string;
	switch (method) {
		case "GET":
			try {
				const client = await clientPromise;
				const db = client.db();
				const user = await db.collection("users").findOne({ _id: new ObjectId(userId) });
				user.id = user._id.toString();
				delete user._id;
				res.status(200).json(user as User);
			} catch (error) {
				res.status(500).json(error);
			}
			break;
		case "PUT":
			try {
				const user = req.body as User;
				const client = await clientPromise;
				const db = client.db();
				const result = await db.collection("users").updateOne({ _id: new ObjectId(userId) }, { $set: user });
				res.status(200).json(result);
			} catch (error) {
				res.status(500).json(error);
			}
			break;
		case "DELETE":
			try {
				const client = await clientPromise;
				const db = client.db();
				const result = await db.collection("users").deleteOne({ _id: new ObjectId(userId) });
				res.status(200).json(result);
			} catch (error) {
				res.status(500).json(error);
			}
			break;
		default:
			res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
			res.status(405).end(`Method ${method} Not Allowed`);
	}
};
