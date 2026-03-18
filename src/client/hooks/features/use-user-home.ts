"use client";

import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import type { UserHomeData, ApiResponse } from "@/shared/types";
import { ROUTES } from "@/shared/constants/routes";

type UseUserHomeOptions = {
    initialData?: UserHomeData;
    refetchInterval?: number | false;
};

type UseUserHomeReturn = {
    data: UserHomeData | undefined;
    loading: boolean;
    error: string | null;
    refetch: () => void;
    isFetching: boolean;
};

async function fetchUserHome(): Promise<UserHomeData> {
    const res = await fetch(ROUTES.api.userHome);
    const data = (await res.json()) as ApiResponse<UserHomeData>;

    if (!data.success) {
        throw new Error(data.error.message);
    }

    return data.data;
}

export function useUserHome(
    options: UseUserHomeOptions = {},
): UseUserHomeReturn {
    const { initialData, refetchInterval = 30000 } = options;

    const query: UseQueryResult<UserHomeData, Error> = useQuery({
        queryKey: ["user-home"],
        queryFn: fetchUserHome,
        initialData,
        refetchInterval,
        staleTime: 10000, // 10 seconds
        gcTime: 5 * 60 * 1000, // 5 minutes
        retry: 1,
    });

    return {
        data: query.data,
        loading: query.isLoading,
        error: query.error?.message ?? null,
        refetch: () => query.refetch(),
        isFetching: query.isFetching,
    };
}

export const userHomeKeys = {
    all: ["user-home"] as const,
    lists: () => [...userHomeKeys.all, "list"] as const,
    list: (filters: Record<string, unknown>) =>
        [...userHomeKeys.lists(), { filters }] as const,
    details: () => [...userHomeKeys.all, "detail"] as const,
    detail: (id: string) => [...userHomeKeys.details(), id] as const,
};
