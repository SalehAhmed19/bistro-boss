import SectionTitle from "../../../components/SectionTitle/SectionTitle";

export default function PaymentHistory() {
  // TODO: payment history - date, transaction id, email
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
              <th>Category</th>
              <th>Total Price</th>
              <th>Payment Date / Transaction ID</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            <tr>
              <td>
                <div className="flex items-center gap-3">
                  <div>
                    <div className="font-bold">name</div>
                    <div className="text-sm opacity-50">email</div>
                  </div>
                </div>
              </td>
              <td>email</td>
              <td>$ 20</td>
              <td>
                <div>
                  <p>date</p>
                  <p className="font-bold text-orange-400">Transaction</p>
                </div>
              </td>
            </tr>
            {/* ))} */}
          </tbody>
        </table>
      </div>
    </div>
  );
}
