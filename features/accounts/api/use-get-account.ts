

import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";

export const useGetAccounts = () => {
    const query = useQuery({
        queryKey: ["accounts"],
        queryFn: async () => {
            // Assertion tipe manual agar tidak unknown
            const typedClient = client as {
                api: {
                    accounts: {
                        $get: () => Promise<Response>
                    }
                }
            };

            const response = await typedClient.api.accounts.$get();

            if (!response.ok) {
                throw new Error("Failed to fetch accounts!");
            }

            const { data } = await response.json();
            return data;
        }
    });

    return query;
}

