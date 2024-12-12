const fetchUserByUsername = async (username) => {
    const appId = "cm4h03chd03wcsqwn3ppxosbd";
    const appSecret = "46euSmNcGQiMorhShMtyebhCgTUY47dWoJCTBuzu9gyGkbp65DuLhF5gb3aNcJBBtYcnGAW8R1LmGjMMN9voT1qk";

    const url = "https://auth.privy.io/api/v1/users/telegram/username";
    console.log(`Username: ${username}`)
    console.log(`Basic ${appId}:${appSecret}`)

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Authorization": `Basic ${btoa(`${appId}:${appSecret}`)}`,
                "privy-app-id": appId,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username: username })
        });

        if (!response.ok) {
            console.error(`HTTP error! status: ${response.status}`);
            return false
        }

        const data = await response.json();
        console.log("Response Data:", data);
        return true
    } catch (error) {
        console.error("Error fetching user by username:", error);
        return false
    }
};

await fetchUserByUsername("balojey")