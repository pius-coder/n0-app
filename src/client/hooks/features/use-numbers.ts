"use client";

import { useState, useEffect } from "react";
import type { PhoneNumber, ApiResponse } from "@/shared/types";

export function useNumbers() {
  const [numbers, setNumbers] = useState<PhoneNumber[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);

    fetch("/api/numbers")
      .then((res) => res.json() as Promise<ApiResponse<PhoneNumber[]>>)
      .then((res) => {
        if (!res.success) throw new Error(res.error.message);
        setNumbers(res.data);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return { numbers, loading, error };
}
