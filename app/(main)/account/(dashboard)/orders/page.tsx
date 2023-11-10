import OrdersTemplate from "@modules/account/templates/orders-template"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Ordens",
  description: "Página com suas pedidos...",
}

export default function Orders() {
  return <OrdersTemplate />
}
