import React from 'react'
import ContentLoader from 'react-content-loader'

const DashBoardLoader = props => {
  return (
    <ContentLoader
      viewBox="0 0 820 450"
      height={450}
      width={820}
      speed={2}
      backgroundColor= "#aadac9"
      foregroundColor= "#009688"
      {...props}
    >
      <rect x="10" y="10" rx="5" ry="5" width="260" height="140" />
      <rect x="280" y="10" rx="5" ry="5" width="260" height="140" />
      <rect x="10" y="160" rx="5" ry="5" width="260" height="140" />
      <rect x="280" y="160" rx="5" ry="5" width="260" height="140" />
      <rect x="10" y="310" rx="5" ry="5" width="260" height="140" />
      <rect x="280" y="310" rx="5" ry="5" width="260" height="140" />
    </ContentLoader>
  )
}

export default DashBoardLoader