// src/app/properties/[listingId]/page.tsx
import PropertyPageClient from './PropertyPageClient'

export default function Page({ params }: { params: { listingId: string } }) {
  return <PropertyPageClient listingId={params.listingId} />
}
