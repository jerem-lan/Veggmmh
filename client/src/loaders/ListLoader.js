import React from 'react'
import ContentLoader from 'react-content-loader'

const ListLoader = props => (
  <ContentLoader
    viewBox="0 0 1000 500"
    height={500}
    width={1000}
    speed={2}
    backgroundColor= "#aadac9"
    foregroundColor= "#009688"
    {...props}
  >
    <rect x="0" y="10" rx="5" ry="5" width="200" height="30" />
    <rect x="0" y="70" rx="10" ry="10" width="1000" height="65" />
    <rect x="0" y="140" rx="10" ry="10" width="1000" height="65" />
    <rect x="0" y="210" rx="10" ry="10" width="1000" height="65" />
    <rect x="0" y="280" rx="10" ry="10" width="1000" height="65" />
    <rect x="0" y="350" rx="10" ry="10" width="1000" height="65" />

  </ContentLoader>
)


export default ListLoader