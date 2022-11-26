import { useState, useEffect } from "react";
import {
  useSession,
  useUser,
  UserButton,
  SignInButton,
  SignUpButton,
} from "@clerk/nextjs";
import { createClient } from "@supabase/supabase-js";
import styles from "../../styles/Home.module.css";

import Link from "next/link";

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

export default function ListProviders() {
  const { isSignedIn } = useUser();
  const { session } = useSession();
  const [providers, setProviders] = useState([]);
  const [loadingProviders, setLoadingProviders] = useState(true);

  useEffect(() => {
    const loadProviders = async () => {
      try {
        setLoadingProviders(true);
        const supabaseAccessToken = await session.getToken({
          template: "supabase",
        });
        const supabase = await supabaseClient(supabaseAccessToken);
        const { data } = await supabase.from("providers").select();

        // let { data, error } = await supabase.from("providers").select("*");

        // let { data, error } = await supabase.rpc("list_providers");

        // if (error) console.error(error);
        // else console.log(data);

        console.log("Provider list : ", data);
        setProviders(data);
      } catch (e) {
        alert(e);
      } finally {
        setLoadingProviders(false);
      }
    };
    loadProviders();
  }, []);

  if (loadingProviders) {
    return <div className={styles.label}>Loading...</div>;
  }

  // display all the providers
  return <ProvidersList list={providers} />;
}

function ProvidersList({ list }) {
  return (
    <div className="flex flex-column flex-row-ns col-1 col-2-m col-3-l col-5-xl ">
      {(list &&
        list.length > 0 &&
        list.map((item, index) => <ProviderItem key={index} item={item} />)) ||
        "no providers yet"}
    </div>
  );
}

function ProviderItem({ item }) {
  return (
    <Link href={`/provider/${item.id}`}>
      <div className=" flex flex-column mr3 pointer dim ">
        <article className="mw5 center bg-white br0 pa3 pa4-ns mv3 ba b--black-20">
          <div className="tc">
            <img
              src="https://innostudio.de/fileuploader/images/default-avatar.png"
              className="br3 h3 w3 flex mb4"
              title=""
            />
            <h1 className="f6 fw7">
              {item.name.first} {item.name.last}
            </h1>
            {/* <hr className="mw3 bb b--black-10" /> */}
          </div>
          <p className="lh-copy measure center f7 black-40 justify-center tc">
            {item.location.city}
          </p>
        </article>
      </div>
    </Link>
  );
}

// supabase
//   .from('users')
//   .select('id')
//   .eq('email', 'doe@example.com')
//   .then(response => {
//     console.log(response)
//   })
