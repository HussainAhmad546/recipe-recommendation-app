// import React, { useState, useEffect } from 'react';

// const PaymentTracking = () => {
//   const [payments, setPayments] = useState([]);

//   useEffect(() => {
//     fetch('/api/payments')
//       .then(response => response.json())
//       .then(data => setPayments(data));
//   }, []);

//   return (
//     <div>
//       <h2 className="text-xl font-semibold mb-4">Payment Tracking</h2>
//       <table className="min-w-full bg-white">
//         <thead>
//           <tr>
//             <th className="py-2">User</th>
//             <th className="py-2">Amount</th>
//             <th className="py-2">Date</th>
//           </tr>
//         </thead>
//         <tbody>
//           {payments.map(payment => (
//             <tr key={payment.id}>
//               <td className="py-2">{payment.user}</td>
//               <td className="py-2">{payment.amount}</td>
//               <td className="py-2">{payment.date}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default PaymentTracking;


import React from 'react';

const PaymentTracking = () => {
  const payments = [
    { id: 1, user: 'John Doe', amount: '$100', date: '2024-07-20' },
    { id: 2, user: 'Jane Smith', amount: '$50', date: '2024-07-21' },
    { id: 3, user: 'Sam Wilson', amount: '$75', date: '2024-07-22' },
  ];

  return (
    <div className="p-6 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Payment Tracking</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">User</th>
            <th className="py-2 px-4 border-b">Amount</th>
            <th className="py-2 px-4 border-b">Date</th>
          </tr>
        </thead>
        <tbody>
          {payments.map(payment => (
            <tr key={payment.id}>
              <td className="py-2 px-4 border-b">{payment.user}</td>
              <td className="py-2 px-4 border-b">{payment.amount}</td>
              <td className="py-2 px-4 border-b">{payment.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentTracking;
