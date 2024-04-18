import jwt from "jsonwebtoken";

export const VerifyToken = (req, res, next) => {
  // console.log("Verifying token");
  const token = req.cookies.token;
  // console.log(token);
  if (!token) return res.status(401).json({ message: "Not authenticated nt" });
  jwt.verify(token, process.env.jwt_secret, async (err, payload) => {
    if (err) return res.status(403).json({ message: "Token is not valid" });

    req.userid=payload.id;
    next();
  });


};
