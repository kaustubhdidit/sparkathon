export const handleDeleteOrder = async (orderId, setOrders, setFilteredOrders) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/orders/deleteOrder`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orderId }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        alert(data.message);  // Show the success message as an alert
        setOrders((prevOrders) => prevOrders.filter((order) => order._id !== orderId));
        setFilteredOrders((prevOrders) => prevOrders.filter((order) => order._id !== orderId));
      } else {
        console.error('Error deleting order:', data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  