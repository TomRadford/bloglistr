import { Image, Skeleton } from '@mantine/core'
import { useState } from 'react'

const ImageLoader = ({ imageUrl }) => {
    const [loaded, setLoaded] = useState(false)
    return (
        <>
            <Image
                style={{ display: `${loaded ? `block` : `none`}` }}
                src={imageUrl}
                onLoad={() => setLoaded(true)}
            />
            <Skeleton
                style={{ display: `${!loaded ? `block` : `none`}` }}
                height={200}
            />
        </>
    )
}
export default ImageLoader
