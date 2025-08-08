import PropertyPageClient from './PropertyPageClient'

export default async function Page({
  params,
}: {
  params: Promise<{ listingId: string }>
}) {
  const { listingId } = await params
  // pass the raw slug (e.g. "2b-n1-a-29-shoreditch-heights")
  return <PropertyPageClient listingId={listingId} />
}
