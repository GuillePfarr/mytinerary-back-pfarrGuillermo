// import User from "../config/Models/User.js";
// import bcrypt from 'bcryptjs'
// import jwt from 'jsonwebtoken'
// export const signUp = async (req, res) => {

//     try {

//         const { email, password } = req.body
//         const userInDB = await User.findOne({ email })

//         if (userInDB) {
//             return res.json({ success: false, error: "El email ya está registrado" })
//         }

//         const passwordHash = bcrypt.hashSync(password, 10)

//         const newObj = { ...req.body }
//         newObj.password = passwordHash

//         const newUser = await User.create(newObj)

//         const userResponse = { email: newUser.email, image: newUser.image, name: newUser.name, _id: newUser._id }

//         const token = jwt.sign({ name: newUser.name }, "Aldi$Berliner*", { expiresIn: '1h' })

//         return res.status(201).json({ success: true, user: userResponse, token: token })

//     } catch (error) {

//         res.json({ success: false, error: error })
//     }

// }


// export const signIn = async (req, res) => {

//     try {
//         const { email, password } = req.body
//         const userInDB = await User.findOne({ email })

//         if (!userInDB) {
//             return res.json({ success: false, error: "Email o contrasena incorrectos" })
//         }
//         const validPassword = bcrypt.compareSync(password, userInDB.password)

//         if (!validPassword) {
//             return res.json({ success: false, error: " Email o contrasena incorrectos" })
//         }

//         const userResponse = { email: userInDB.email, image: userInDB.image, name: userInDB.name, _id: userInDB._id }

//         const token = jwt.sign({ name: userInDB.name, email: userInDB.email }, "Aldi$Berliner*")

//         return res.status(200).json({ success: true, user: userResponse, token: token })

//     } catch (error) {

//         res.json({ success: false, error: error })
//     }

// }

// export const signInToken = ( req, res ) => {


// const userResponse = { email: req.user.email, image: req.user.image, name: req.user.name, _id: req.user._id }
// res.status(200).json( {success: true , user : userResponse})
// }


import User from "../config/Models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const buildUserResponse = (user) => ({
  email: user.email,
  image: user.image,
  name: user.name,
  _id: user._id,
});

const signToken = (user) => {
  const payload = {
    sub: String(user._id),
    email: user.email,
    name: user.name,
  };

  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "1h",
  });
};

export const signUp = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userInDB = await User.findOne({ email });
    if (userInDB) {
      return res.status(409).json({ success: false, error: "El email ya está registrado" });
    }

    const passwordHash = bcrypt.hashSync(password, 10);
    const newUser = await User.create({ ...req.body, password: passwordHash });

    const userResponse = buildUserResponse(newUser);
    const token = signToken(newUser);

    return res.status(201).json({ success: true, user: userResponse, token });
  } catch {
    return res.status(500).json({ success: false, error: "Error interno" });
  }
};

export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userInDB = await User.findOne({ email });
    if (!userInDB) {
      return res.status(401).json({ success: false, error: "Email o contraseña incorrectos" });
    }

    const validPassword = bcrypt.compareSync(password, userInDB.password);
    if (!validPassword) {
      return res.status(401).json({ success: false, error: "Email o contraseña incorrectos" });
    }

    const userResponse = buildUserResponse(userInDB);
    const token = signToken(userInDB);

    return res.status(200).json({ success: true, user: userResponse, token });
  } catch {
    return res.status(500).json({ success: false, error: "Error interno" });
  }
};

export const signInToken = (req, res) => {
  const userResponse = buildUserResponse(req.user);
  return res.status(200).json({ success: true, user: userResponse });
};
