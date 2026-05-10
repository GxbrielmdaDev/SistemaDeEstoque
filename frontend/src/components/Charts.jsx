import { Pie, Bar } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js'
import { useTheme } from '../contexts/ThemeContext'

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title)

export function ProfitLossChart({ data }) {
  const { isDark } = useTheme()
  if (!data || (data.lucro === 0 && data.prejuizo === 0)) {
    return (
      <div className="chart-container">
        <p style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '20px' }}>
          Nenhum dado de lucro/prejuízo disponível
        </p>
      </div>
    )
  }

  const chartData = {
    labels: ['Lucro', 'Prejuízo'],
    datasets: [
      {
        data: [data.lucro, data.prejuizo],
        backgroundColor: [
          '#10b981', // Verde para lucro
          '#ef4444', // Vermelho para prejuízo
        ],
        borderColor: ['#059669', '#dc2626'],
        borderWidth: 2,
        hoverOffset: 4,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: isDark ? '#ffffff' : 'var(--text-secondary)',
          font: { size: 12 },
          padding: 15,
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const value = context.parsed
            return `R$ ${value.toFixed(2)}`
          },
        },
      },
    },
  }

  return (
    <div className="chart-container">
      <Pie data={chartData} options={options} />
    </div>
  )
}

export function ProductsByCategoryChart({ data }) {
  const { isDark } = useTheme()
  if (!data || data.length === 0) {
    return (
      <div className="chart-container">
        <p style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '20px' }}>
          Nenhum dado de categorias disponível
        </p>
      </div>
    )
  }

  const chartData = {
    labels: data.map((item) => item.categoria),
    datasets: [
      {
        label: 'Quantidade de Produtos',
        data: data.map((item) => item.quantidade),
        backgroundColor: [
          '#dc2626',
          '#2563eb',
          '#f59e0b',
          '#10b981',
          '#8b5cf6',
          '#ec4899',
          '#06b6d4',
          '#14b8a6',
        ],
        borderColor: isDark ? '#ffffff' : '#1f2937',
        borderWidth: 2,
        hoverBackgroundColor: '#fbbf24',
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    indexAxis: 'y',
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          color: isDark ? '#ffffff' : 'var(--text-secondary)',
          font: { size: 12 },
          padding: 15,
        },
      },
      title: {
        display: true,
        text: 'Produtos por Categoria',
        color: isDark ? '#ffffff' : 'var(--text-secondary)',
        font: { size: 14, weight: 'bold' },
      },
    },
    scales: {
      x: {
        ticks: {
          color: isDark ? '#ffffff' : 'var(--text-secondary)',
          stepSize: 1,
        },
        grid: {
          color: isDark ? '#ffffff' : 'var(--border-color)',
        },
      },
      y: {
        ticks: {
          color: isDark ? '#ffffff' : 'var(--text-secondary)',
        },
        grid: {
          color: isDark ? '#ffffff' : 'var(--border-color)',
        },
      },
    },
  }

  return (
    <div className="chart-container">
      <Bar data={chartData} options={options} />
    </div>
  )
}
