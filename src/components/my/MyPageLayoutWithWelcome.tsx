import { ReactNode } from "react"
import MyPageLayout from "./MyPageLayout"
import MyPageWelcomeCard from "./MyPageWelcomeCard"

interface MyPageLayoutWithWelcome {
  children: ReactNode
}

const MyPageLayoutWithWelcome = ({children}:MyPageLayoutWithWelcome) => {
  return (
    <>
    <MyPageLayout pageTitle="마이페이지">
      <MyPageWelcomeCard />
      {children}
    </MyPageLayout>

    </>
  )
}

export default MyPageLayoutWithWelcome