import React from 'react'
import ContentLoader from 'react-content-loader'

const ListLoader = props => (
  <ContentLoader
    viewBox="0 0 500 475"
    height={475}
    width={500}
    speed={2}
    backgroundColor= "#aadac9"
    foregroundColor= "#009688"
    {...props}
  >
    
    <rect x="129.9" y="29.5" width="125.5" height="17" />
    <rect x="129.9" y="64.7" width="296" height="17" />
    <rect x="129.9" y="97.8" width="253.5" height="17" />
    <rect x="129.9" y="132.3" width="212.5" height="17" />

    
    <rect x="130.4" y="199.9" width="125.5" height="17" />
    <rect x="130.4" y="235" width="296" height="17" />
    <rect x="130.4" y="268.2" width="253.5" height="17" />
    <rect x="130.4" y="302.6" width="212.5" height="17" />

    
    <rect x="130.4" y="404.2" width="296" height="17" />
    <rect x="130.4" y="437.3" width="253.5" height="17" />
    
    

    
  </ContentLoader>
)


export default ListLoader