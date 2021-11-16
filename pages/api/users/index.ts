import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "utils/mongodb";
import { User } from "models";

export default async (req: NextApiRequest, res: NextApiResponse<User[] | User>) => {
	const { method } = req;
	switch (method) {
		case "GET":
			try {
				const client = await clientPromise;
				const db = client.db();
				const users = await db.collection<User>("users").find({}).toArray();
				res.status(200).json(users);
			} catch (error) {
				res.status(500).json(error);
			}
			break;
		case "POST":
			try {
				const newUser = req.body as User;
				const client = await clientPromise;
				const db = client.db();
				const result = await db.collection<User>("users").insertOne(newUser);
				newUser.id = result.insertedId.toString();
				res.status(200).json(newUser);
			} catch (error) {
				res.status(500).json(error);
			}
			break;
		default:
			res.setHeader("Allow", ["GET", "POST"]);
			res.status(405).end(`Method ${method} Not Allowed`);
	}
};
