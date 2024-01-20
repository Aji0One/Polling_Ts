import { render, fireEvent, screen, act } from "@testing-library/react";
import Dashboard from "../Pages/Dashboard";
import 'intersection-observer';
import axios from "axios";


jest.useFakeTimers();
jest.mock('axios');
jest.mock("react-router-dom", () => ({
    useNavigate: () => jest.fn()
}))

describe("Dashboard", () => {

    beforeEach(() => {
        jest.restoreAllMocks();
    });

    test("Initial Rendering", async () => {
        jest.spyOn(axios, "get").mockResolvedValueOnce({
            data: {
                hits: [{
                    title: "Title 1",
                    created_at: "create",
                    url: "url",
                    author: "author 1"
                }]
            }
        })


        const handleView = jest.fn();
        render(<Dashboard />);

        jest.advanceTimersByTime(10000);

        const polling_title = screen.getByText(/Polling App/i);

        expect(polling_title).toBeInTheDocument();
        const viewbtn = await screen.findByTestId("view-0");
        fireEvent.click(viewbtn, handleView());
        expect(handleView).toHaveBeenCalledTimes(1);
    })

    test("catch block Rendering", async () => {
        act(() => jest.spyOn(axios, "get").mockRejectedValueOnce(new Error("error")))

        render(<Dashboard />);

        act(() => jest.advanceTimersByTime(10000));

        const polling_title = screen.getByText(/Polling App/i);
        expect(polling_title).toBeInTheDocument();
    })

    test("Rendering axios with empty hits array", async () => {
        jest.spyOn(axios, "get").mockResolvedValueOnce({
            data: {
                hits: []
            }
        })

        // const mockLocalStorage: any = {
        //     details: JSON.stringify(
        //         []

        //     ),
        // };



        // const getItemMock = jest.spyOn(Storage.prototype, 'getItem');
        // getItemMock.mockImplementation((key) => mockLocalStorage[key]);


        // const parseMock = jest.spyOn(JSON, 'parse');
        // parseMock.mockReturnValue([]);



        render(<Dashboard />);

        jest.advanceTimersByTime(10000);

        const polling_title = screen.getByText(/Polling App/i);
        expect(polling_title).toBeInTheDocument();
    })

    test("Rendering value with sessionstorage and axios call", async () => {
        jest.spyOn(axios, "get").mockResolvedValueOnce({
            data: {
                hits: [{
                    title: "Title 1",
                    created_at: "create",
                    url: "",
                    author: "author 1"
                }]
            }
        })

        // const mockLocalStorage: any = {
        //     details: JSON.stringify(
        //         [{ created_at: "", }, { title: "" }]

        //     ),
        // };

        // const getItemMock = jest.spyOn(Storage.prototype, 'getItem');
        // getItemMock.mockImplementation((key) => mockLocalStorage[key]);

        // const parseMock = jest.spyOn(JSON, 'parse');
        // parseMock.mockReturnValue([{ created_at: "create", title: "title", url: "url", author: "" }, {}]);

        const handleView = jest.fn();
        render(<Dashboard />);

        act(() => jest.advanceTimersByTime(10000));

        const polling_title = screen.getByText(/Polling App/i);

        expect(polling_title).toBeInTheDocument();
        const viewbtn = await screen.findByTestId("view-0");
        fireEvent.click(viewbtn, handleView());
        expect(handleView).toHaveBeenCalledTimes(1);
    })

})


