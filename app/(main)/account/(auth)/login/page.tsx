import LoginTemplate from "@modules/account/templates/login-template"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Login",
  description: "Entre na sua conta | Artesanatos da Zizi",
}

export default function Login() {
  return <LoginTemplate />
}
