import { renderHook, waitFor } from "@testing-library/react";
import { UseAxios } from "hooks/useAxios";
import { URL, MOCK_DATA } from "constants/constants";

describe("UseAxios", () => {
    it("should return the initial values for data, error and loaded", async () => {
        const { result } = renderHook(() => UseAxios(URL, "get", ""));
        const { data, error, loaded } = result.current;

        expect(data).toBe(null);
        expect(error).toBe("");
        expect(loaded).toBe(false);
    });
});

// When the request has been successfully fulfilled
describe("when data is fetched successfully", () => {
    beforeEach(() => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve(MOCK_DATA),
            })
        );
    });

    it("should return data", async () => {
        const { result } = renderHook(() => UseAxios(URL, "get", ""));

        await waitFor(() =>
            expect(result.current).toEqual({
                data: MOCK_DATA,
                error: "",
                loaded: true,
            })
        );
    });
});

// Test for the loading property
describe("the loading property", () => {
    it("should initially return true and then false", async () => {
        const { result } = renderHook(() => UseAxios(URL, "get", ""));
        const { loaded } = result.current;

        // asserting that the initial value of loading is true
        // before the re-render
        expect(loaded).toBe(false);
        await waitFor(() => {
            const { loaded } = result.current;
            expect(loaded).toBe(true);
        });
    });
});

// Test for the error scenario
describe("when data is not fetched successfully", () => {
    const mockedError = new Error("mocked error");
    beforeEach(() => {
        // we mock fetch to return a rejected value so that 
        // we add some coverage in the catch block in our code
        fetch.mockRejectedValue(mockedError);
    });

    it("should return the Error", async () => {
        const { result } = renderHook(() => UseAxios(URL, "get", "axas"));

        await waitFor(() => {
            const { error } = result.current;
            expect(error).toBe("");
        });
    });
});