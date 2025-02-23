import { getAddress } from "@chopinframework/next";
 

const address = await getAddress();
export default function MyComponent() {
  
 
    if (address) {
        return (
            <div>
                <p>Logged in as {address}</p>
            </div>
        );
    }

}