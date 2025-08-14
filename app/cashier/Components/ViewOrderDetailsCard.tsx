"use client";
import { Loading } from "@/components/Loading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useGetOneOrderQuery } from "@/services/OrderServices/order.query";
import { useOrderUpdateStatusMutation } from "@/services/OrderServices/order.queryMutation";
import { BadgeDollarSign, Download } from "lucide-react";
import { useRef, useState } from "react";
import { toPng } from "html-to-image";
import { format } from "date-fns";

const InvoiceBill = ({ orderDetailsById }: { orderDetailsById: any }) => {
  const invoiceRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateFileName = () => {
    const customerName = orderDetailsById.customer.name.replace(/\s+/g, "_");
    const date = format(
      new Date(orderDetailsById.completedAt || orderDetailsById.createdAt),
      "yyyyMMdd"
    );
    return `Invoice_${customerName}_${date}_#${orderDetailsById.id.slice(
      0,
      8
    )}.png`;
  };

  const downloadInvoice = async () => {
    if (!invoiceRef.current) return;

    setIsGenerating(true);
    try {
      console.log("Invoice:", invoiceRef.current);
      const dataUrl = await toPng(invoiceRef?.current, {
        // includeQueryParams: true,
            
        // pixelRatio: true,
        // quality: 1,
        // onImageErrorHandler: (e) => {
        //   console.log(e.toString);
        // },
        backgroundColor: "#ffffff",
      });

      const link = document.createElement("a");
      link.download = generateFileName();
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error("Error generating invoice:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="p-6">
      <div
        ref={invoiceRef}
        className="bg-white p-8 rounded-lg shadow-lg max-w-2xl mx-auto"
        style={{
          fontFamily: "'Inter', sans-serif",
          border: "1px solid #e2e8f0",
        }}
      >
        {/* Invoice Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">INVOICE</h1>
            <p className="text-gray-500">Order #: {orderDetailsById.id}</p>
          </div>
          <div className="text-right">
            <div className="w-24 h-24 bg-blue-50 rounded-lg flex items-center justify-center mb-2">
              {orderDetailsById.customer.profilePic ? (
                <img
                  src={orderDetailsById.customer.profilePic}
                  alt={orderDetailsById.customer.name}
                  className="w-20 h-20 rounded-full object-cover"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-blue-500 text-white font-bold flex items-center justify-center text-3xl">
                  {orderDetailsById.customer.name[0]}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Invoice Details */}
        <div className="grid grid-cols-2 gap-8 mb-8">
          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-2">
              Bill To
            </h2>
            <p className="text-gray-800 font-medium">
              {orderDetailsById.customer.name}
            </p>
            <p className="text-gray-600">{orderDetailsById.customer.email}</p>
            {orderDetailsById.address && (
              <p className="text-gray-600 mt-1">{orderDetailsById.address}</p>
            )}
          </div>
          <div className="text-right">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">
              Invoice Details
            </h2>
            <p className="text-gray-600">
              <span className="font-medium">Date:</span>{" "}
              {format(
                new Date(
                  orderDetailsById.completedAt || orderDetailsById.createdAt
                ),
                "MMMM d, yyyy"
              )}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Status:</span>
              <span
                className={`ml-1 px-2 py-1 rounded text-xs ${
                  orderDetailsById.status === "COMPLETED"
                    ? "bg-green-100 text-green-800"
                    : orderDetailsById.status === "CONFIRMED"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {orderDetailsById.status}
              </span>
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Payment:</span>
              <span
                className={`ml-1 px-2 py-1 rounded text-xs ${
                  orderDetailsById.bill.paid
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {orderDetailsById.bill.paid ? "Paid" : "Unpaid"} (
                {orderDetailsById.bill.paymentMethod})
              </span>
            </p>
            {orderDetailsById.tableId && (
              <p className="text-gray-600">
                <span className="font-medium">Table:</span> #
                {orderDetailsById.table.number}
              </p>
            )}
          </div>
        </div>

        {/* Items Table - Compact Version */}
        <div className="mb-8">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Item
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Price
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Qty
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Total
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orderDetailsById.items.map((item: any) => (
                  <tr key={item.id}>
                    <td className="px-4 py-4 whitespace-nowrap">
                      {/* <div className="flex items-center"> */}
                        {/* <div className="flex-shrink-0 h-10 w-10">
                          {item.foodItem.images.length > 1 && (
                            <img
                              className="h-10 w-10 rounded-full"
                              src={item.foodItem.images[0]}
                              alt={item.foodItem.name}
                            />
                          )}
                        </div> */}
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {item.foodItem.name}
                          </div>
                        </div>
                      {/* </div> */}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-right text-sm text-gray-500">
                      ${item.foodItem.price.toFixed(2)}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-right text-sm text-gray-500">
                      {item.quantity}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium text-gray-900">
                      ${(item.quantity * item.foodItem.price).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Totals */}
        <div className="flex justify-end">
          <div className="w-64">
            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="text-gray-600">Subtotal:</span>
              <span className="font-medium">
                ${orderDetailsById.bill.total.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="text-gray-600">Tax (0%):</span>
              <span className="font-medium">$0.00</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="text-gray-600">Discount:</span>
              <span className="font-medium">$0.00</span>
            </div>
            <div className="flex justify-between py-4">
              <span className="text-lg font-bold text-gray-800">Total:</span>
              <span className="text-lg font-bold text-blue-600">
                ${orderDetailsById.bill.total.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-gray-200 text-center text-gray-500 text-sm">
          <p>Thank you for your business!</p>
          <p className="mt-1">
            If you have any questions about this invoice, please contact us.
          </p>
        </div>
      </div>

      <div className="mt-6 flex justify-center">
        <Button
          onClick={downloadInvoice}
          disabled={isGenerating}
          className="flex items-center gap-2"
        >
          {isGenerating ? (
            "Generating..."
          ) : (
            <>
              <Download size={16} />
              Download Invoice
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export const ViewOrderDetailsModal = ({ id }: { id: string }) => {
  const {
    data: orderDetailsById,
    isPending,
    isError,
  } = useGetOneOrderQuery(id);

  const [showInvoice, setShowInvoice] = useState(false);

  if (isPending) return <Loading />;
  if (isError) return <h2>Error</h2>;

  if (orderDetailsById)
    return (
      <>
        <InvoiceBill orderDetailsById={orderDetailsById} />
      </>
    );
};
