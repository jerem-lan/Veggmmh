import React from 'react'
import ContentLoader from 'react-content-loader'

const AddLoader = props => (
  <ContentLoader
    viewBox="0 0 500 1000"
    height={1000}
    width={500}
    speed={2}
    backgroundColor= "#aadac9"
    foregroundColor= "#009688"
    {...props}
  >
    
    <rect x="0" y="0" width="200" height="30" />
    <rect x="0" y="50" width="296" height="200" />
    <rect x="0" y="270" width="70" height="30" />
    <rect x="0" y="320" rx="20" ry="20" width="100" height="36" /> 
    <rect x="100" y="320" rx="20" ry="20" width="100" height="36" /> 
    
    <rect x="0" y="370" width="200" height="30" />
    <rect x="0" y="420" width="296" height="200" />
    <rect x="0" y="640" width="70" height="30" />
    <rect x="0" y="690" rx="20" ry="20" width="100" height="36" /> 
    <rect x="100" y="690" rx="20" ry="20" width="100" height="36" />

  </ContentLoader>
)


export default AddLoader