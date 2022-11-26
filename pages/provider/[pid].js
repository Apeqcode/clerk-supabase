import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import {
  useSession,
  useUser,
  UserButton,
  SignInButton,
  SignUpButton,
} from "@clerk/nextjs";
import { createClient } from "@supabase/supabase-js";
// import { createClient } from "@supabase/supabase-js";
import { Header } from "../elements";
const supabaseClient = async (supabaseAccessToken) => {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_KEY,
    {
      global: { headers: { Authorization: `Bearer ${supabaseAccessToken}` } },
    }
  );
  // set Supabase JWT on the client object,
  // so it is sent up with all Supabase requests
  return supabase;
};
import styles from "../../styles/Home.module.css";

export default function SingleProvider() {
  const { isSignedIn, isLoading, user } = useUser();
  const router = useRouter();
  const { pid } = router.query;

  //   const { isSignedIn } = useUser();
  const { session } = useSession();
  const [provider, setProvider] = useState({});
  const [loadingProvider, setLoadingProvider] = useState(true);

  useEffect(() => {
    const loadProvider = async () => {
      try {
        setLoadingProvider(true);
        const supabaseAccessToken = await session.getToken({
          template: "supabase",
        });
        const supabase = await supabaseClient(supabaseAccessToken);
        console.log("pid", pid);
        const { data } = await supabase
          .from("providers")
          .select("*")
          .match({ id: pid });

        // let { data, error } = await supabase.from("providers").select("*");

        // let { data, error } = await supabase.rpc("list_providers");

        // if (error) console.error(error);
        // else console.log(data);

        console.log("Provider : ", data[0]);
        setProvider(data[0]);
      } catch (e) {
        alert(e);
      } finally {
        setLoadingProvider(false);
      }
    };
    loadProvider();
  }, {});

  if (loadingProvider) {
    return <div className={styles.label}>Loading...</div>;
  }

  return (
    <>
      <Header />
      {isLoading ? (
        <></>
      ) : (
        <main className={styles.main}>
          <div className={styles.container}>
            {isSignedIn ? (
              <>
                <header className="tc pv4 pv5-ns">
                  <img
                    src={}
                    className="br3 ba b--black-10 h3 w3"
                    alt="avatar"
                  />
                  <h1 className="f5 f4-ns fw6 black-70">
                    {provider.name.first} {provider.name.last}
                  </h1>
                  <h2 className="f6 black-70 fw2 ttu tracked">
                    {provider.location.city}
                  </h2>
                </header>
              </>
            ) : (
              <div className={styles.label}>
                Sign in to create your todo list!
              </div>
            )}
          </div>
        </main>
      )}
    </>
  );
}
