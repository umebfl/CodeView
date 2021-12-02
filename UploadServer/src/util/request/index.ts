const Request = async (url: string, payload?: RequestInit) => {
    try {
        const rv = await fetch(url, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            ...payload,
        });

        if (rv.status === 200) {
            const data = await rv.json();

            if (data.code === 0) {
                return data.data;
            }
            throw new Error(data.msg);
        }
    } catch (error) {
        throw error;
    }
};

export default Request;
