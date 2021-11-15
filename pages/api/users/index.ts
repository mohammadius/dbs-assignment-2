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
				const users = (await db.collection("users").find({}).toArray()) as User[];
				res.status(200).json(users);
			} catch (error) {
				res.status(500).json(error);
			}
			break;
		// case "POST":
		// TODO: create user
		// break;
		default:
			res.setHeader("Allow", ["GET", "POST"]);
			res.status(405).end(`Method ${method} Not Allowed`);
	}
};
