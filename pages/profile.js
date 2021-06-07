import { Auth, Typography, Button } from "@supabase/ui";
const { Text } = Typography
import { supabase } from '../api'

function Profile(props) {
    const { user } = Auth.useUser();
    if (user)
      return (
        <>
          <Text>Signed in: {user.email}</Text>
          <Button block onClick={() => props.supabaseClient.auth.signOut()}>
            Sign out
          </Button>
        </>
      );
    return props.children 
}

export default function AuthProfile() {
    return (
        <Auth.UserContextProvider supabaseClient={supabase}>
          <Profile supabaseClient={supabase}>
            <Auth supabaseClient={supabase} />
          </Profile>
        </Auth.UserContextProvider>
    )
}