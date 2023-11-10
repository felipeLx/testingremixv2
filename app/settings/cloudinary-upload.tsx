import type { ActionFunctionArgs, UploadHandler } from "@remix-run/node";
import {
  json,
  unstable_composeUploadHandlers as composeUploadHandlers,
  unstable_createMemoryUploadHandler as createMemoryUploadHandler,
  unstable_parseMultipartFormData as parseMultipartFormData,
} from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";

import { uploadImage } from "~/utils/images.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  const uploadHandler: UploadHandler = composeUploadHandlers(
    async ({ name, data }) => {
      if (name !== "img") {
        return undefined;
      }

      const uploadedImage = await uploadImage(data);
      return uploadedImage.secure_url;
    },
    createMemoryUploadHandler(),
  );

  const formData = await parseMultipartFormData(request, uploadHandler);
  const imgSrc = formData.get("img");
  const imgDesc = formData.get("desc");
  if (!imgSrc) {
    return json({ error: "something wrong", imgDesc: null, imgSrc: null });
  }

  return json({ error: null, imgDesc, imgSrc });
};

export default function Index() {
  const data = useActionData<typeof action>();

  return (
    <>
      <Form method="post" encType="multipart/form-data">
        <label htmlFor="img-field">Imagem para Subir</label>
        <input id="img-field" type="file" name="img" accept="image/*" />
        <label htmlFor="img-desc">Descrição da Imagem</label>
        <input id="img-desc" type="text" name="desc" />
        <button type="submit">Confirmar</button>
      </Form>
      {data?.error ? <h2>{data.error}</h2> : null}

      {data?.imgSrc ?? (
        <>
          <h2>uploaded image</h2>
          <img src={data!.imgSrc || ''} alt={data!.imgDesc || ''} />
        </>
      )}
    </>
  );
}
