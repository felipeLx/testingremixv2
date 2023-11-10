import AddressesTemplate from "@modules/account/templates/addresses-template"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Endereço",
  description: "View your addresses",
}

export default function Endereço() {
  return <AddressesTemplate />
}
