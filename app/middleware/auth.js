import jwt from "jsonwebtoken";

export function authInterceptor(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    const secretKey = process.env.SECRET_KEY;

    const publicRoutes = ["/auth"];

    if (publicRoutes.some((route) => req.path.startsWith(route))) {
      return next();
    }

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ statusCode: 401, message: "Unauthorized" });
    }
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, secretKey);

    return next();
  } catch (err) {
    return res.status(401).json({ statusCode: 401, message: "Unauthorized" });
  }
}
