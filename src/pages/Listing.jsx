import { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import Spinner from '../components/Spinner';

export default function Listing() {
    const params = useParams()
    const [listing, setListing] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect (() => {
        const fetchListing = async () => {
            const docRef = doc(db, "listings", params.listingId)
            const docSnap = await getDoc(docRef)
            if (docSnap.exists()) {
                setListing(docSnap.data())
                setLoading(false)
            }
        }
        fetchListing();
    }, [params.listingId])

    if (loading) {
        return <Spinner />
    }

  return (
    <div>{listing.name}</div>
  )
}
