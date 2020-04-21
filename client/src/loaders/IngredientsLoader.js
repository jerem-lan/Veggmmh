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
    <rect x="10" y="80" rx="8" ry="8" width="150" height="132" />
    <rect x="170" y="80" rx="8" ry="8" width="150" height="132" />
    <rect x="330" y="80" rx="8" ry="8" width="150" height="132" />
    <rect x="490" y="80" rx="8" ry="8" width="150" height="132" />
    <rect x="650" y="80" rx="8" ry="8" width="150" height="132" />
    <rect x="810" y="80" rx="8" ry="8" width="150" height="132" />

    <rect x="10" y="230" rx="8" ry="8" width="150" height="132" />
    <rect x="170" y="230" rx="8" ry="8" width="150" height="132" />
    <rect x="330" y="230" rx="8" ry="8" width="150" height="132" />
    <rect x="490" y="230" rx="8" ry="8" width="150" height="132" /> 
    <rect x="650" y="230" rx="8" ry="8" width="150" height="132" />
    <rect x="810" y="230" rx="8" ry="8" width="150" height="132" />

    <rect x="10" y="380" rx="8" ry="8" width="150" height="132" />
    <rect x="170" y="380" rx="8" ry="8" width="150" height="132" />
    <rect x="330" y="380" rx="8" ry="8" width="150" height="132" />
    <rect x="490" y="380" rx="8" ry="8" width="150" height="132" /> 
    <rect x="650" y="380" rx="8" ry="8" width="150" height="132" />
    <rect x="810" y="380" rx="8" ry="8" width="150" height="132" />
    
  </ContentLoader>
)


export default IngredientLoader