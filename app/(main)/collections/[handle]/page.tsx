import { getCollectionByHandle } from "@lib/data"
import CollectionTemplate from "@modules/collections/templates"
import { Metadata } from "next"
import { notFound } from "next/navigation"

type Props = {
  params: { handle: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  console.debug("Generating metadata for collection page", params.handle)
  const { collections } = await getCollectionByHandle(params.handle)

  const collection = collections[0]

  if (!collection) {
    notFound()
  }

  return {
    title: `${collection.title} | Artesanatos da Zizi`,
    description: `${collection.title} coleções`,
  }
}

export default async function CollectionPage({ params }: Props) {
  const { collections } = await getCollectionByHandle(params.handle)

  const collection = collections[0]

  return <CollectionTemplate collection={collection} />
}
