"use client";

import useReactQuery from "@/hooks/useReactQuery";

const Profile= () => {
  const {useProtectedQuery} = useReactQuery();
  const {data} = useProtectedQuery({url:"/accounts/customer-profile/", queryKey:"customer-profile"})
  return (
    <div>
     <pre>{JSON.stringify(data,undefined,2)}</pre>
    </div>
  )
}

export default Profile;