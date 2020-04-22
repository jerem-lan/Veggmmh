import React from 'react'
import ContentLoader from 'react-content-loader'

const DashBoardLoader = props => {
  return (
    <ContentLoader
      viewBox="0 0 820 700"
      height={700}
      width={820}
      speed={2}
      backgroundColor= "#aadac9"
      foregroundColor= "#009688"
      {...props}
    >
      <rect x="10" y="10" rx="5" ry="5" width="180" height="72" />
      <rect x="10" y="90" rx="5" ry="5" width="293" height="128" />
      <rect x="310" y="90" rx="5" ry="5" width="293" height="128" />
      <rect x="10" y="230" rx="5" ry="5" width="293" height="128" />
      <rect x="310" y="230" rx="5" ry="5" width="293" height="128" />
      <rect x="10" y="370" rx="5" ry="5" width="293" height="128" />
      <rect x="310" y="370" rx="5" ry="5" width="293" height="128" />
      <rect x="10" y="510" rx="5" ry="5" width="293" height="128" />
      <rect x="310" y="510" rx="5" ry="5" width="293" height="128" />
      
    </ContentLoader>
  )
}

export default DashBoardLoader