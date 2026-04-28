import { BarChart, Bar, XAxis, YAxis, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const CATEGORY_COLORS = {
  food:          '#e57373',
  housing:       '#64b5f6',
  utilities:     '#81c784',
  transport:     '#ffb74d',
  entertainment: '#ba68c8',
  salary:        '#4db6ac',
  other:         '#a1887f',
};

function SpendingChart({ transactions }) {
  const data = Object.entries(
    transactions
      .filter(t => t.type === 'expense')
      .reduce((acc, t) => ({ ...acc, [t.category]: (acc[t.category] ?? 0) + t.amount }), {})
  )
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);

  if (data.length === 0) return null;

  const total = data.reduce((sum, d) => sum + d.value, 0);
  const dataWithPct = data.map(d => ({ ...d, pct: (d.value / total) * 100, fill: CATEGORY_COLORS[d.name] }));

  return (
    <div className="spending-chart">
      <h2>Spending by Category</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={dataWithPct} margin={{ top: 24, right: 16, left: 16, bottom: 4 }}>
          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
          <YAxis tickFormatter={(v) => `$${v}`} tick={{ fontSize: 12 }} />
          <Tooltip formatter={(value, _name, props) => [`$${value.toFixed(2)} (${props.payload.pct.toFixed(1)}%)`, 'Spending']} />
          <Bar dataKey="value" name="Spending" label={{ content: ({ x, width, y, index }) => (
            <text x={x + width / 2} y={y - 6} textAnchor="middle" fontSize={11} fill="#555">
              {`${dataWithPct[index]?.pct.toFixed(1)}%`}
            </text>
          ) }}>
            {dataWithPct.map((entry) => (
              <Cell key={entry.name} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default SpendingChart;
