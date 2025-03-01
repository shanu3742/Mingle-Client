import useResize from "@hooks/useResize"
import MobileView from "./MobileView"
import DesktopView from "./DesktopView"
import './onBoarding.scss'

const OnBoarding = () => {

  const deviceDimension = useResize();

  return (
    <>
      {deviceDimension.deviceType === 1 && <MobileView />}
      {deviceDimension.deviceType >= 2 && <DesktopView />}
    </>
  )
}

export default OnBoarding