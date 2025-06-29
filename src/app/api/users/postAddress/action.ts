"use server";

import { connect } from "@/lib/mongoConnections";
import Users from "@/lib/users";

export async function handleForm(formData: FormData) {
  const name = formData.get("name") as string;
  const phoneNumber = formData.get("phoneNumber") as string;
  const area = formData.get("area") as string;
  const street = formData.get("street") as string;
  const flat = formData.get("flat") as string;
  const mapLink = formData.get("mapLink") as string;
  const notes = formData.get("notes") as string;
  const userID = formData.get("userID") as string;

  await connect();

  await Users.findOneAndUpdate(
    { userId: userID },
    {
      userId: userID,
      name,
      phoneNumber,
      area,
      street,
      flat,
      googleMap: mapLink,
      deliveryNote: notes,
    },
    { new: true, upsert: true } // creates if not found
  );
}
