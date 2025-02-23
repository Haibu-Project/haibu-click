import { getAddress } from "@chopinframework/next";

export default async function MyComponent() {
  const address = await getAddress();

  return (
    <div>
      {address ? (
        <p>Logged in as {address}</p>
      ) : (
        <p>Not logged in</p>
      )}
    </div>
  );
}
