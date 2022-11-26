import { useUser } from "@clerk/nextjs";

export default async function updateMetadata() {
  const { user } = useUser();
  const data = "Data to store unsafely";

  try {
    const response = await user.update({
      unsafeMetadata: { data },
    });
    if (response) {
      console.log("res", response);
    }
  } catch (err) {
    console.error("error", err);
  }
}
