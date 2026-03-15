import { NumberService } from "@/server/services";
import { success, error } from "@/server/helpers";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const result = await NumberService.getById(id);

    if (!result.ok) return error(result.error);

    return success(result.data);
  } catch (e) {
    return error(e);
  }
}
