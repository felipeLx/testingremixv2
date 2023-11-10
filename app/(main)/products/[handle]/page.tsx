import { getProductByHandle } from "@lib/data"
import ProductTemplate from "@modules/products/templates"
import { Metadata } from "next"
import { notFound } from "next/navigation"

type Props = {
  params: { handle: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = await getProductByHandle(params.handle);

  const product = data.products[0]

  if (!product) {
    notFound()
  }

  return {
    title: `${product.title} | Artesanatos da Zizi`,
    description: `${product.title}`,
    openGraph: {
      title: `${product.title} | Artesanatos da Zizi`,
      description: `${product.title}`,
      images: product.thumbnail ? [product.thumbnail] : [],
    },
  }
}

export default async function ProductPage({ params }: Props) {
  const products = await getProductByHandle(params.handle);
  if(!products) {
    return <div>Erro ao carregar produto</div>
  }

  return <ProductTemplate product={products} />
}
