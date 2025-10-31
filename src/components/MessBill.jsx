import React, { useState, useEffect } from 'react';

// --- CONSTANTS FOR POINT CALCULATION ---
const MEAL_POINTS = {
  Breakfast: 2,
  Lunch: 3,
  Dinner: 3,
  Snacks: 2,
};
const MAX_MONTHLY_POINTS = 45;
const POINT_VALUE_MULTIPLIER = 8; // ₹8 per point deduction

// MOCK DATA STRUCTURE (Simulates data fetched from the backend)
const MOCK_BILL_DATA = {
    monthlyBaseBill: 3800.00, 
    messOffApplications: [
      { id: 1, startDate: '2025-10-05', endDate: '2025-10-07', mealsSkipped: ['Breakfast', 'Lunch', 'Dinner'], status: 'Approved' },
      { id: 2, startDate: '2025-10-15', endDate: '2025-10-15', mealsSkipped: ['Lunch', 'Snacks'], status: 'Approved' },
      { id: 3, startDate: '2025-10-21', endDate: '2025-10-21', mealsSkipped: ['Dinner'], status: 'Approved' },
      { id: 4, startDate: '2025-10-28', endDate: '2025-10-29', mealsSkipped: ['All'], status: 'Pending' },
    ],
    extraRequirements: [
      { item: 'Birthday Cake Charge', cost: 350.00 },
      { item: 'Late Fee Fine (Sep)', cost: 100.00 },
    ],
    month: 'October 2025',
};
// ----------------------------------------

function MessBill({ studentId }) {
  const [bill, setBill] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const calculateBill = (data) => {
    let totalSkippedPoints = 0;
    let totalMessOffDays = 0;
    const approvedApplications = [];

    data.messOffApplications.forEach(app => {
      if (app.status === 'Approved') {
        const start = new Date(app.startDate);
        const end = new Date(app.endDate);
        const timeDiff = end.getTime() - start.getTime();
        const days = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1;
        
        totalMessOffDays += days;

        const pointsPerDay = app.mealsSkipped.reduce(
          (sum, meal) => sum + (MEAL_POINTS[meal] || 0), 
          0
        );
        totalSkippedPoints += pointsPerDay * days;
        approvedApplications.push(app); 
      }
    });

    const deductionPoints = Math.min(totalSkippedPoints, MAX_MONTHLY_POINTS);
    const deductionAmount = deductionPoints * POINT_VALUE_MULTIPLIER;
    
    const totalExtraCharges = data.extraRequirements.reduce(
      (sum, req) => sum + req.cost, 
      0
    );

    const subTotal = data.monthlyBaseBill - deductionAmount;
    const finalAmount = subTotal + totalExtraCharges;
    
    return {
      ...data,
      approvedMessOffs: approvedApplications, 
      totalMessOffDays: totalMessOffDays,
      totalSkippedPoints: totalSkippedPoints,
      deductionPoints: deductionPoints,
      deductionAmount: deductionAmount,
      totalExtraCharges: totalExtraCharges,
      totalAmountDue: finalAmount,
      subTotal: subTotal,
    };
  };

  useEffect(() => {
    const fetchBill = () => {
      setTimeout(() => {
        try {
            const calculatedBill = calculateBill(MOCK_BILL_DATA); 
            setBill(calculatedBill);
            setError(null);
        } catch (err) {
            setError('Error fetching bill: Please contact mess administration.');
        } finally {
            setLoading(false);
        }
      }, 800);
    };
    
    if (studentId) {
      fetchBill();
    }
  }, [studentId]);

  if (loading) return <p>💰 Fetching and calculating your latest bill details...</p>;
  if (error) return <p className="error-message">Error: {error}</p>;
  if (!bill) return <p>No bill recorded for this month.</p>;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
    });
  };

  return (
    <div className="mess-bill dashboard-content-block">
      <h3>Monthly Mess Bill for **{bill.month}**</h3>
      <p>Student ID: **{studentId}**</p>
      <hr />

      {/* --- Mess Off/Deduction Summary --- */}
      <div className="bill-section">
        <h4>1. Mess Off & Deduction Details</h4>
        
        <div className="mess-off-dates-summary">
            <h5>Approved Mess Off Periods ({bill.totalMessOffDays} days total):</h5>
            {bill.approvedMessOffs.length > 0 ? (
                <ul className="mess-off-list">
                    {bill.approvedMessOffs.map(app => (
                        <li key={app.id}>
                            <span className="date-range">
                                **{formatDate(app.startDate)}** {app.startDate !== app.endDate ? ` to **${formatDate(app.endDate)}**` : ''}
                            </span>
                            <span className="skipped-meals">
                                Meals Skipped: *{app.mealsSkipped.join(', ')}*
                            </span>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-info">No approved mess off days this month.</p>
            )}
        </div>
        
        <div className="bill-summary-grid">
            <p><strong>Total Calculated Points Saved:</strong> <span>{bill.totalSkippedPoints} points</span></p>
            <p><strong>Max Points Eligible for Deduction:</strong> <span>{MAX_MONTHLY_POINTS} points</span></p>
            <p><strong>Points Used for Deduction:</strong> <span>{bill.deductionPoints} points</span></p>
            <p className="deduction-amount">
                **Deduction Amount (₹{POINT_VALUE_MULTIPLIER}/point):** <span className="text-success">- ₹{bill.deductionAmount.toFixed(2)}</span>
            </p>
        </div>
      </div>
      <hr />

      <div className="bill-section">
        <h4>2. Base Calculation</h4>
        <p><strong>Base Mess Fee (Admin Released):</strong> <span>₹{bill.monthlyBaseBill.toFixed(2)}</span></p>
        <p><strong>Sub-Total (Base Fee - Deduction):</strong> <span>₹{bill.subTotal.toFixed(2)}</span></p>
      </div>
      <hr />
      
      <div className="bill-section">
        <h4>3. Extra Requirements/Charges</h4>
        {bill.extraRequirements.length > 0 ? (
          <ul className="extra-charges-list">
            {bill.extraRequirements.map((req, index) => (
              <li key={index}>
                {req.item}: <span className="text-error">+ ₹{req.cost.toFixed(2)}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-info">No extra requirements or fines this month.</p>
        )}
        <p><strong>Total Extra Charges:</strong> <span>+ ₹{bill.totalExtraCharges.toFixed(2)}</span></p>
      </div>
      <hr />

      <div className="final-total">
        <h4>Final Amount Due: <span className="bill-total">₹{bill.totalAmountDue.toFixed(2)}</span></h4>
        <button className="pay-bill-btn">Proceed to Payment</button>
      </div>
    </div>
  );
}

export default MessBill;