"use client";

import { useState, useEffect } from "react";
import type { UserHomeData, ApiResponse } from "@/shared/types";
import { ROUTES } from "@/shared/constants/routes";

type UseUserHomeReturn = {
  data: UserHomeData | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
};

export function useUserHome(): UseUserHomeReturn {
  const [data, setData] = useState<UserHomeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    let cancelled = false;

    setLoading(true);
    setError(null);

    fetch(ROUTES.api.userHome)
      .then((res) => res.json() as Promise<ApiResponse<UserHomeData>>)
      .then((res) => {
        if (cancelled) return;
        if (!res.success) throw new Error(res.error.message);
        setData(res.data);
      })
      .catch((e: Error) => {
        if (!cancelled) setError(e.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [tick]);

  const refetch = () => setTick((t) => t + 1);

  return { data, loading, error, refetch };
}
