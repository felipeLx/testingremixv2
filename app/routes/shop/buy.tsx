import type { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";

import { getStripeSession, getDomainUrl } from "~/utils/stripe.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  const stripeRedirectUrl = await getStripeSession(
    process.env.PRICE_ID as string,
    getDomainUrl(request),
  );
  return redirect(stripeRedirectUrl);
};

export default function Buy() {
  return (
    <Form method="post">
      <button type="submit">buy</button>
    </Form>
  );
}
