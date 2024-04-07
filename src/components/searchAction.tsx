"use server";
import {redirect} from "next/navigation";

export async function searchAction(formData: FormData) {
  "use server";
  redirect(`/?q=${formData.get("q")}`);
}
