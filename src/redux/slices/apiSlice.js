import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://66a511d65dc27a3c190a9139.mockapi.io/api/cars/",
    }),
    endpoints: (builder) => ({
        getCars: builder.query({
            query: () => "cars",
        }),
        addCar: builder.mutation({
            query: (newCar) => ({
                url: "cars",
                method: "POST",
                body: newCar,
            }),
        }),
        updateCar: builder.mutation({
            query: ({ id, ...updatedCar }) => ({
                url: `cars/${id}`,
                method: "PUT",
                body: updatedCar,
            }),
        }),
        deleteCar: builder.mutation({
            query: (id) => ({
                url: `cars/${id}`,
                method: "DELETE",
            }),
        }),
    }),
});

export const {
    useGetCarsQuery,
    useAddCarMutation,
    useUpdateCarMutation,
    useDeleteCarMutation,
} = apiSlice;
export default apiSlice;
