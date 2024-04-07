"use server";
import {redirect} from "next/navigation";

export async function searchAction(formData: FormData) {
  redirect(`/?q=${formData.get("query")}`);
}
