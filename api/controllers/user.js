import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

dotenv.config({ path: "../.env" });

const secret = process.env.SECRET;

export const getRegisteredJobs = async (req, res) => {
  try {
    const student = await User.findById(req.params.id).populate(
      "registeredJobs"
    );
    const registeredJobs = student.registeredJobs;
    res.status(200).json(registeredJobs);
  } catch (err) {
    res.status(404).json({ message: "User not found" });
  }
};
/* Example of a response to a student wanting to find out which jobs
he/she registered for. 
[
    {
        "categories": [
            "Arts & Heritage",
            "Animal Welfare",
            "Children & Youth"
        ],
        "registrations": [
            """ insert student's id here  """
        ],
        "_id": "60c711250628bb3dd81f4435",
        "title": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        "organizer": "John Tan",
        "purpose": "Lorem ipsum"
    },
    {
        "categories": [
            "Arts & Heritage",
            "Animal Welfare",
        ],
        "registrations": [
            """ insert student's id here  """,
            """ insert some otehr student's id here  """
        ],
        "_id": "60cc564c31193b0d18580738",
        "title": "Org 1 post",
        "organizer": "organization1",
        "purpose": "Testing"
    }
]
*/

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser)
      return res.status(404).json({ message: "User does not exist" });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });

    // User with correct password found
    const token = jwt.sign(
      {
        email: existingUser.email,
        id: existingUser._id,
        role: existingUser.role,
        name: existingUser.name,
      },
      `${secret}`,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({ result: existingUser, token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const signup = async (req, res) => {
  const {
    role,
    firstName,
    lastName,
    name,
    contactNum,
    email,
    password,
    regNum,
    website,
  } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const userName = firstName && lastName ? `${firstName} ${lastName}` : name;

    const newUser = await User.create({
      role,
      name: userName,
      regNum,
      contactNum,
      email,
      password: hashedPassword,
      website,
    });

    // console.log(newUser);

    const token = jwt.sign(
      {
        email: newUser.email,
        id: newUser._id,
        role: newUser.role,
        name: newUser.name,
      },
      `${secret}`,
      {
        expiresIn: "1h",
      }
    );

    res.status(201).json({ result: newUser, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });

    // console.log(error);
  }
};

export const updatePassword = async (req, res) => {
  // const { website, contactNum, newPassword, confirmNewPassword } = req.body;
  const { newPassword, confirmNewPassword } = req.body;
  if (newPassword !== confirmNewPassword) {
    return res.status(405).json({ message: "Passwords do not match" });
  }

  try {
    const hashedPassword = await bcrypt.hash(newPassword, 12);
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { password: hashedPassword },
      {
        new: true,
      }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

// export const adminsignup = async (req, res) => {
//   const { name, email, password } = req.body;

//   try {
//     const existingUser = await User.findOne({ email });

//     if (existingUser)
//       return res.status(400).json({ message: "User already exists" });

//     const hashedPassword = await bcrypt.hash(password, 12);

//     const newUser = await User.create({
//       email,
//       password: hashedPassword,
//       isAdmin: true,
//     });

//     console.log(newUser);

//     const token = jwt.sign({ email: newUser.email, id: newUser._id }, secret, {
//       expiresIn: "1h",
//     });

//     res.status(201).json({ result: newUser, token });
//   } catch (error) {
//     res.status(500).json({ message: "Something went wrong" });

//     console.log(error);
//   }
// };
