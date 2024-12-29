import { useQuery } from "@tanstack/react-query";
import { getStaysTodayActivity } from "../../services/apiBookings";

export function useTodayActivity() {
    const { isLoading, data: activeBookings } = useQuery({
        queryFn: getStaysTodayActivity,
        queryKey: ["today-activity"],
    });

    return {
        isLoading,
        activeBookings,
    };
}
