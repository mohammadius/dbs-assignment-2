import type { NextApiRequest, NextApiResponse } from "next";
import { ObjectId } from "mongodb";
import clientPromise from "utils/mongodb";
import { User } from "models";

export default async (req: NextApiRequest, res: NextApiResponse<User>) => {
	const { method } = req;
	switch (method) {
		case "GET":
			try {
				const userId = req.query.userId as string;
				const client = await clientPromise;
				const db = client.db();
				const user = (await db.collection("users").findOne({ _id: new ObjectId(userId) })) as User;
				res.status(200).json(user);
			} catch (error) {
				res.status(500).json(error);
			}
			break;
		// case "POST":
		// TODO: create user
		// break;
		default:
			res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
			res.status(405).end(`Method ${method} Not Allowed`);
	}
};
