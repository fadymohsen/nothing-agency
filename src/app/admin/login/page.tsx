import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";
import LoginForm from "./LoginForm";

export const metadata = { title: "Admin login", robots: { index: false, follow: false } };

export default async function LoginPage() {
  const store = await cookies();
  if (await verifySessionToken(store.get(SESSION_COOKIE)?.value)) redirect("/admin");
  return <LoginForm />;
}
