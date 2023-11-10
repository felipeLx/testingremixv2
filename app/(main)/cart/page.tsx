import CartTemplate from "@modules/cart/templates"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Carrinho",
  description: "Veja o seu carrinho de compras | Artesanatos da Zizi",
}

export default function Cart() {
  return <CartTemplate />
}
