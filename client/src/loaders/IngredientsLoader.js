import React from 'react'
import ContentLoader from 'react-content-loader'

const IngredientLoader = props => (
  <ContentLoader
    viewBox="0 0 1360 900"
    height={900}
    width={1360}
    speed={2}
    backgroundColor= "#aadac9"
    foregroundColor= "#009688"
    {...props}
  >
    <rect x="30" y="20" rx="8" ry="8" width="200" height="200" />
    
    
    <rect x="250" y="20" rx="8" ry="8" width="200" height="200" />
    
    
    <rect x="470" y="20" rx="8" ry="8" width="200" height="200" />
    <rect x="690" y="20" rx="8" ry="8" width="200" height="200" />
    <rect x="910" y="20" rx="8" ry="8" width="200" height="200" />
    <rect x="1130" y="20" rx="8" ry="8" width="200" height="200" />
    <rect x="30" y="340" rx="8" ry="8" width="200" height="200" />
    <rect x="250" y="340" rx="8" ry="8" width="200" height="200" />
    <rect x="470" y="340" rx="8" ry="8" width="200" height="200" />
    <rect x="690" y="340" rx="8" ry="8" width="200" height="200" /> 
    <rect x="910" y="340" rx="8" ry="8" width="200" height="200" />
    <rect x="1130" y="340" rx="8" ry="8" width="200" height="200" />
    
  </ContentLoader>
)


export default IngredientLoader