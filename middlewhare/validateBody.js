import { z } from "zod";

export function validateBody(schema) {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const tree = z.treeifyError(result.error);
      return res.status(422).json({ errors: tree.properties ?? tree });
    }

    req.body = result.data;
    next();
  };
}

export function validateQuery(schema) {
  return (req, res, next) => {
    const result = schema.safeParse(req.query);

    if (!result.success) {
      const tree = z.treeifyError(result.error);
      return res.status(422).json({ errors: tree.properties ?? tree });
    }

    next();
  };
}

export function validateParams(schema) {
  return (req, res, next) => {
    const result = schema.safeParse(req.params);

    if (!result.success) {
      const tree = z.treeifyError(result.error);
      return res.status(422).json({ errors: tree.properties ?? tree });
    }

    next();
  };
}