import Joi from "@hapi/joi";
import { NextApiHandler } from "next";

type Locations = "body" | "query";

interface ValidateOptions {
  schema: Joi.Schema;
  location?: Locations;
}

export const validate = (
  { schema, location = "body" }: ValidateOptions,
  handler: NextApiHandler
): NextApiHandler => (req, res) => {
  const { error } = schema.validate(req[location]);

  if (error) res.status(400).json({ code: 400, message: error });
  else return handler(req, res);
};
