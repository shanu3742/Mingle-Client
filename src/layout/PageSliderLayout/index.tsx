//react import
import  { ReactNode, useEffect, useState } from 'react'
//react router import
import { useLocation } from 'react-router-dom';
//material ui import
import { Slide } from '@mui/material';



const PageSliderLayout = ({children}:{children:ReactNode}) => {
  //react hooks and state
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState(location.pathname);
  const [isAnimating, setIsAnimating] = useState(false);

  //life cycle effect
  useEffect(() => {
    if (location.pathname !== currentPath) {
      setIsAnimating(true);
      const timeout = setTimeout(() => {
        setCurrentPath(location.pathname);
        setIsAnimating(false); 
      }, 1);

      return () => clearTimeout(timeout); 
    }
  }, [location.pathname, currentPath]);
  // page ui
  return (
    <>
    {isAnimating && (
        <Slide direction={'left'} in={!isAnimating} timeout={300}>
          <div className="outgoing-page" key={currentPath}>
            {children}
          </div>
        </Slide>
      )}
      {!isAnimating && (
        <Slide direction={'left'} in={!isAnimating} timeout={300}>
          <div className="incoming-page" key={currentPath}>
            {children}
          </div>
        </Slide>
      )}
    </>
  )
}

export default PageSliderLayout