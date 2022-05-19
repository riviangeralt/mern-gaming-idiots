import {
  Typography,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import {
  listAllOrders,
  getOrderStatus,
  updateOrderStatus,
} from "../../api/callApi";
import moment from "moment";
import SelectController from "../../control/SelectController";
import { useForm } from "react-hook-form";
import { status } from "../../common/common";
const Orders = (props) => {
  const [orders, setOrders] = useState([]);
  const methods = useForm();

  useEffect(() => {
    listAllOrders(props.user)
      .then((res) => {
        setOrders(res);
      })
      .catch((err) => console.log(err));
    methods.setValue("status", orders?.status);
  }, [orders.length]);

  const handleChange = (e, id) => {
    methods.setValue("status", e.target.value);
    updateOrderStatus(props.user, id, e.target.value);
  };
  return (
    <>
      <div style={{ backgroundColor: "#FFF", padding: "1rem" }}>
        <Typography variant="h5" component="h2" color="#000">
          All Orders ({orders.length})
        </Typography>
        {Object.keys(orders) && orders.length > 0 ? (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Order ID</TableCell>
                <TableCell>Product</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Ordered</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order._id}>
                  <TableCell>{order._id}</TableCell>
                  <TableCell>
                    {order.cartItems.map((item) => (
                      <div>
                        {item.game.name} ({item.game.id})
                      </div>
                    ))}
                  </TableCell>
                  <TableCell>{order.cartItems.length}</TableCell>
                  <TableCell>₹{order.amount}</TableCell>
                  <TableCell style={{ width: "8rem" }}>
                    <SelectController
                      name="status"
                      label="Status"
                      control={methods.control}
                      defaultValue={
                        methods.getValues("status")
                          ? methods.getValues("status")
                          : order?.status
                      }
                      disabled={
                        order?.status === "Pending" ||
                        methods.getValues("status") === "Pending"
                          ? false
                          : true
                      }
                      // value={order?.status}
                      rules={{ required: false }}
                      errors={methods.formState.errors}
                      options={status}
                      register={methods.register}
                      onChange={(e) => handleChange(e, order._id)}
                    ></SelectController>
                  </TableCell>
                  <TableCell>{moment(order.createdAt).fromNow()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <Typography variant="h5" component="h2" color="#000">
            No Orders
          </Typography>
        )}
      </div>
    </>
  );
};

export default Orders;
