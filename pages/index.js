import styles from "../styles/Home.module.css";

import { useState, useEffect } from "react";
import {
  useSession,
  useUser,
  UserButton,
  SignInButton,
  SignUpButton,
} from "@clerk/nextjs";
// import { createClient } from "@supabase/supabase-js";
import { Header, TodoList, ListProviders } from "./elements";
import Link from "next/link";
// import { ClerkProvider, useUser, SignIn } from "@clerk/nextjs";

function BecomeAProviderButton() {
  // Use the useUser hook to get the Clerk.user object
  const { isLoaded, isSignedIn, user } = useUser();

  console.log("user", user);

  return (
    <div className="absolute flex flex-column items-center justify-center bottom-0 right-0 pa4">
      <Link href="/provider">
        <button className="flex flex-column items-center justify-center ph3 pv2  bg-green f6 fw5 white br1 bn pointer ">
          {"Become a provider"}
        </button>
      </Link>
    </div>
  );
}

// const supabaseClient = async (supabaseAccessToken) => {
//   const supabase = createClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL,
//     process.env.NEXT_PUBLIC_SUPABASE_KEY,
//     {
//       global: { headers: { Authorization: `Bearer ${supabaseAccessToken}` } },
//     }
//   );
//   // set Supabase JWT on the client object,
//   // so it is sent up with all Supabase requests
//   return supabase;
// };

export default function Home() {
  const { isSignedIn, isLoading, user } = useUser();
 
  // const [todos, setTodos] = useState(null);
 
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
                <div className={styles.label}>Welcome {user.firstName}!</div>

                <ListProviders />

                <BecomeAProviderButton />

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

// const Header = () => {
//   const { isSignedIn } = useUser();

//   return (
//     <header className={" flex flex-row justify-between pa3 bg-near-white  "}>
//       <div>My Todo App</div>
//       {isSignedIn ? (
//         <UserButton className="  flex ph3 pv2 br2 bn bs-a bg-white f7 fw5 black-40 hover-black-70 pointer ttu tracked " />
//       ) : (
//         <div className=" flex flex-row ">
//           <SignInButton className="  flex ph3 pv2 br2 bn bs-a bg-white f7 fw5 black-40 hover-black-70 pointer ttu tracked " />
//           &nbsp;
//           <SignUpButton className="  flex ph3 pv2 br2 bn bs-a bg-white f7 fw5 black-40 hover-black-70 pointer ttu tracked " />
//         </div>
//       )}
//     </header>
//   );
// };

// const TodoList = ({ todos, setTodos }) => {
//   const { session } = useSession();
//   const [loadingTodos, setLoadingTodos] = useState(true);

//   // on first load, fetch and set todos
//   useEffect(() => {
//     const loadTodos = async () => {
//       try {
//         setLoadingTodos(true);
//         const supabaseAccessToken = await session.getToken({
//           template: "supabase",
//         });
//         const supabase = await supabaseClient(supabaseAccessToken);
//         const { data: todos } = await supabase.from("todos").select("*");
//         setTodos(todos);
//       } catch (e) {
//         alert(e);
//       } finally {
//         setLoadingTodos(false);
//       }
//     };
//     loadTodos();
//   }, []);

//   // if loading, just show basic message
//   if (loadingTodos) {
//     return <div className={styles.label}>Loading...</div>;
//   }

//   // display all the todos
//   return (
//     <>
//       {todos?.length > 0 ? (
//         <div className={styles.todoList}>
//           <ol>
//             {todos.map((todo) => (
//               <li key={todo.id}>{todo.title}</li>
//             ))}
//           </ol>
//         </div>
//       ) : (
//         <div className={styles.label}>You don&apos;t have any todos!</div>
//       )}
//     </>
//   );
// };

// function AddTodoForm({ todos, setTodos }) {
//   const { session } = useSession();
//   const [newTodo, setNewTodo] = useState("");
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (newTodo === "") {
//       return;
//     }

//     const supabaseAccessToken = await session.getToken({
//       template: "supabase",
//     });
//     const supabase = await supabaseClient(supabaseAccessToken);
//     const { data } = await supabase
//       .from("todos")
//       .insert({ title: newTodo, user_id: session.user.id })
//       .select();

//     setTodos([...todos, data[0]]);
//     setNewTodo("");
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input onChange={(e) => setNewTodo(e.target.value)} value={newTodo} />
//       &nbsp;<button>Add Todo</button>
//     </form>
//   );
// }
