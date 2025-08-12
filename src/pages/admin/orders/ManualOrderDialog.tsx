// Replace your handleCreateOrder function with this updated version:
const handleCreateOrder = async () => {
  const { cname, phone, totalFinalAmount, deliveryType, shippingMethod, expertAssistance, email, address, pincode, status, technology, material, layerThickness, printer, infill, colorFinish, quantity, gstNumber, originalFileName } = orderData;
  
  const payload = {
    customization: {
      technology,
      material,
      layerThickness,
      printer,
      infill, // Keep as 'infill' - your controller should handle the mapping
      colorFinish,
      originalFileName,
      quantity,
    },
    deliveryInstructions: {
      deliveryType,
      cname,
      address,
      pincode,
      expertAssistance,
      email,
      phone,
      shippingMethod,
    },
    printPrices: {
      totalFinalAmount: parseFloat(totalFinalAmount),
    },
    status,
    gstNumber,
  };

  try {
    // Get the auth token (adjust based on where you store it)
    const token = localStorage.getItem('token') || 
                  localStorage.getItem('authToken') || 
                  sessionStorage.getItem('token') ||
                  sessionStorage.getItem('authToken');

    if (!token) {
      alert('Authentication required. Please log in.');
      return;
    }

    // ✅ CHANGED: Updated URL to match your existing backend route
    const response = await fetch(`${process.env.NEXT_PUBLIC_MEKUVA_BACKEND_API_BASE_URL}/manual-orders/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Add authentication header
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Order created successfully:', data);
    alert('Order created successfully!');
    onClose();
    
  } catch (error) {
    console.error('Error creating order:', error);
    alert(`Failed to create order: ${error.message}`);
  }
};
