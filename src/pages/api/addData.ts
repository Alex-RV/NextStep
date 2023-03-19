import type { NextApiRequest, NextApiResponse } from "next";
import { addData } from "../components/Database/Database";

type AddDataIn = {
  firstName: string;
  lastName: string;
  interests: string;
  goals: string;
  availibility: string;
};

export default function addDataDB(
  req: NextApiRequest,
  res: NextApiResponse<Object>
) {
  let body = req.body as AddDataIn;
  addData(
    body.firstName,
    body.lastName,
    body.interests,
    body.goals,
    body.availibility
  );
  res.status(200).json({});
}
