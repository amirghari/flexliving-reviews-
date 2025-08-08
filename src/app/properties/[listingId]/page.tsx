import PropertyPageClient from './PropertyPageClient'

export default async function Page({
  params,
}: {
  params: Promise<{ listingId: string }>
}) {
  const { listingId } = await params
  return <PropertyPageClient listingId={listingId} />
}
