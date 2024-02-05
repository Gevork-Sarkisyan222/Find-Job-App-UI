import React from 'react';
import ContentLoader from 'react-content-loader';

const MyLoader = (props) => (
  <ContentLoader
    speed={2}
    width={350}
    height={290}
    viewBox="0 0 350 290"
    backgroundColor="#d6d6d6"
    foregroundColor="#ecebeb"
    {...props}>
    <rect x="184" y="158" rx="0" ry="0" width="3" height="2" />
    <rect x="177" y="148" rx="0" ry="0" width="1" height="1" />
    <rect x="3" y="5" rx="0" ry="0" width="340" height="285" />
  </ContentLoader>
);

export default MyLoader;
