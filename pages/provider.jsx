import { useState, useEffect } from "react";
import {
  useSession,
  useUser,
  UserButton,
  SignInButton,
  SignUpButton,
} from "@clerk/nextjs";
// import { createClient } from "@supabase/supabase-js";
import { Header, TodoList } from "./elements";
import styles from "../styles/Home.module.css";
export default function Provider() {
  const { isSignedIn, isLoading, user } = useUser();
  const [todos, setTodos] = useState(null);
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
                <div className={styles.label}>Become a provider!</div>

                {/* <AddTodoForm todos={todos} setTodos={setTodos} /> */}
                {/* <TodoList todos={todos} setTodos={setTodos} /> */}
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
