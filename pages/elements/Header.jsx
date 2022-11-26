import React from "react";
import {
  useSession,
  useUser,
  UserButton,
  SignInButton,
  SignUpButton,
} from "@clerk/nextjs";

export default function Header() {
  const { isSignedIn } = useUser();

  return (
    <header className={" flex flex-row justify-between pa3 bg-near-white  "}>
      <div>Model.Space</div>
      {isSignedIn ? (
        <UserButton className="  flex ph3 pv2 br2 bn bs-a bg-white f7 fw5 black-40 hover-black-70 pointer ttu tracked " />
      ) : (
        <div className=" flex flex-row ">
          <SignInButton className="  flex ph3 pv2 br2 bn bs-a bg-white f7 fw5 black-40 hover-black-70 pointer ttu tracked " />
          &nbsp;
          <SignUpButton className="  flex ph3 pv2 br2 bn bs-a bg-white f7 fw5 black-40 hover-black-70 pointer ttu tracked " />
        </div>
      )}
    </header>
  );
}
