/* eslint-disable @typescript-eslint/no-this-alias */
import { model, Schema } from "mongoose";
import { TUser } from "./user.interface";
import { USER_ROLE, USER_STATUS } from "./user.constant";
import bcrypt from "bcrypt";
import config from "../../config";

// create user schema
const UserSchema = new Schema<TUser>(
  {
    name: {
      type: "String",
      required: [true, "name is required"],
      trim: true,
    },
    email: {
      type: "String",
      required: [true, "email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: "String",
      required: [true, "password is required"],
      select: 0,
    },
    role: {
      type: "String",
      required: [true, "role is required"],
      enum: Object.values(USER_ROLE),
    },
  },
  { timestamps: true }
);

// setup password hashing
UserSchema.pre("save", async function (next) {
  const user = this;

  user.password = await bcrypt.hash(
    user.password as string,
    Number(config.bcrypt_salt_rounds)
  );

  next();
});

UserSchema.post("save", async function (doc, next) {
  doc.password = "";

  next();
});

// create and export model schema
export const User = model<TUser>("User", UserSchema);
