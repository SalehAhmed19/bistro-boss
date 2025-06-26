import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useAuth from "../../../Hooks/useAuth";
import usePaymentHistory from "../../../Hooks/usePaymentHistory";

export default function PaymentHistory() {
  // TODO: payment history - date, transaction id, email
  const { user } = useAuth();
  const [, payments] = usePaymentHistory();
  // console.log(payments);
  return (
    <div>
      <SectionTitle
        title={"Payment History"}
        subtitle={"Your all payments history"}
      />

      <div>
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Name / Email</th>
              <th>Items</th>
              <th>Total Price</th>
              <th>Payment Date / Transaction ID</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {payments.map((payment) => (
              <tr>
                <td>
                  <div className="flex items-center gap-3">
                    <div>
                      <div className="font-bold">{user.displayName}</div>
                      <div className="text-sm opacity-50">{payment.email}</div>
                    </div>
                  </div>
                </td>
                <td>
                  {payment.cartItems.map((item) => (
                    <>
                      {item} <br />
                    </>
                  ))}
                </td>
                <td>$ {payment.price}</td>
                <td>
                  <div>
                    <p>{payment.date.split("T")[0]}</p>
                    <p className="font-bold text-orange-400">
                      {payment.transactionId}
                    </p>
                  </div>
                </td>
                <td className="text-slate-300 font-bold">{payment.status}</td>
              </tr>
            ))}
            {/* ))} */}
          </tbody>
        </table>
      </div>
    </div>
  );
}
