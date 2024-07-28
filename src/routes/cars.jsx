import React, { useState } from "react";
import { Table, Input, Button } from "antd";
import {
    useGetCarsQuery,
    useAddCarMutation,
    useUpdateCarMutation,
    useDeleteCarMutation,
} from "../redux/slices/apiSlice";

const Cars = () => {
    const { data: cars, error, isLoading } = useGetCarsQuery();
    console.log(cars);
    const [addCar] = useAddCarMutation();
    const [updateCar] = useUpdateCarMutation();
    const [deleteCar] = useDeleteCarMutation();

    const [newCar, setNewCar] = useState({ name: "", model: "" });
    const [selectedCar, setSelectedCar] = useState(null);

    const handleAddCar = async () => {
        await addCar(newCar);
        setNewCar({ name: newCar.name, model: newCar.model });
    };

    const handleDeleteCar = async (id) => {
        await deleteCar(id);
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return console.log(error);

    const columns = [
        {
            title: "Name",
            dataIndex: "name",
        },
        {
            title: "Model",
            dataIndex: "model",
        },
        {
            title: "Actions",
            render: (button) => (
                <Button danger onClick={() => handleDeleteCar(button.id)}>
                    Delete
                </Button>
            ),
        },
    ];

    return (
        <div className="container">
            <h1 style={{ textAlign: "center" }}>Create car</h1>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    alignItems: "center",
                }}
            >
                <Input
                    style={{ width: "400px" }}
                    type="text"
                    placeholder="Name"
                    value={newCar.name}
                    onChange={(e) =>
                        setNewCar({ ...newCar, name: e.target.value })
                    }
                />
                <Input
                    style={{ width: "400px" }}
                    type="text"
                    placeholder="Model"
                    value={newCar.model}
                    onChange={(e) =>
                        setNewCar({ ...newCar, model: e.target.value })
                    }
                />
                <Button type="default" onClick={() => handleAddCar(newCar)}>
                    Add Car
                </Button>
            </div>
            <div>
                <h2 style={{ textAlign: "center", fontSize: "30px" }}>Cars</h2>
                <Table
                    style={{ paddingRight: "200px", paddingLeft: "200px" }}
                    columns={columns}
                    dataSource={cars}
                    size="middle"
                />
            </div>
            {selectedCar && (
                <div>
                    <h2>Edit Car</h2>
                    <input
                        type="text"
                        value={selectedCar.name}
                        onChange={(e) =>
                            setSelectedCar({
                                ...selectedCar,
                                name: e.target.value,
                            })
                        }
                    />
                    <input
                        type="text"
                        value={selectedCar.model}
                        onChange={(e) =>
                            setSelectedCar({
                                ...selectedCar,
                                model: e.target.value,
                            })
                        }
                    />
                    <button onClick={handleUpdateCar}>Update Car</button>
                </div>
            )}
        </div>
    );
};

export default Cars;
